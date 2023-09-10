import { createAttachment, updateAttachment, updateProfile } from 'applet-apis'
import { Button, FieldError, Form, InputField, Label, TextAreaField } from 'applet-design'
import { useEffect, useState } from 'react'
import { useApplet } from 'applet-shell'
import { useNavigate } from 'react-router-dom'
import ImageUploader from '../../components/ImageUploader/ImageUploader'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const uploadImage = async (file: File) => {
  const filename = file.name
  const attachmentData = await createAttachment(filename)
  const formParams = JSON.parse(attachmentData.uploadInfo.formParams)
  const formData = new FormData()
  formData.append('Signature', formParams.Signature)
  formData.append('policy', formParams.policy)
  formData.append('key', formParams.key)
  formData.append('OSSAccessKeyId', formParams.OSSAccessKeyId)
  formData.append('contentType', 'multipart/form-data')
  formData.append('success_action_status', '200')
  formData.append('file', file)

  await axios({
    method: 'post',
    url: attachmentData.uploadInfo.host,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  const updateAttachmentRes = await updateAttachment(attachmentData.id, 'UPLOADED')

  return updateAttachmentRes.url
}

const ProfileSettingsPage = () => {
  const applet = useApplet()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const formMethods = useForm()

  const profile = applet?.profile

  useEffect(() => {
    applet?.setHeaderTitle('Profile Settings')
  }, [])

  useEffect(() => {
    console.log(profile)
    if (profile) {
      formMethods.setValue('userName', profile.name)
    }
  }, [profile])

  const onSubmit = async (data: any) => {
    if (saving) return
    const { userName } = data
    if (!userName || userName === '') return

    try {
      setSaving(true)
      let avatarUrl = null
      if (files.length > 0) {
        const fileItem = files[0]
        avatarUrl = await uploadImage(fileItem)
      }

      const profile2Update = {
        name: userName,
        avatarUrl
      }

      const res = await updateProfile(profile2Update)
      console.log(res)
      setSaving(false)
      if (res.data.hasException) {
        applet?.toast.error(res.data.exceptions[0].message)
      } else {
        applet?.toast.success('Update profile success')
      }
    } catch (e) {
      setSaving(false)
    }
  }

  const handleBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    navigate(-1)
  }

  const onImagesChange = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
  }

  return (
    <div className="max-w-7xl mx-auto pt-2 pb-5 sm:px-6 lg:px-8 px-4">
      <Form onSubmit={onSubmit}
        formMethods={formMethods}>
        <Label className="mt-3">Name</Label>
        <InputField
          name="userName"
          placeholder="Type your name"
          className="input"
          errorClassName="input error"
          validation={{ required: 'Name is required', minLength: 1, maxLength: 140 }}
        />
        <FieldError name="userName" />

        <Label className="mt-3">Avatar</Label>
        <ImageUploader onChange={onImagesChange} filesLength={1} />

        <div className="mt-5">
          <Button
            variant='primary'>
            Save
          </Button>
          <Button
            className="ml-2"
            onClick={handleBack}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ProfileSettingsPage
