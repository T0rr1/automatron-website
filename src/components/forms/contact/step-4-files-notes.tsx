'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ContactFormData } from '@/lib/validations/contact'
import { Upload, X, FileText, AlertCircle } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']

export function Step4FilesNotes() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<ContactFormData>()

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadErrors, setUploadErrors] = useState<string[]>([])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const newErrors: string[] = []
    const validFiles: File[] = []

    files.forEach((file) => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name}: File size must be less than 5MB`)
        return
      }

      // Check file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        newErrors.push(`${file.name}: Only PDF, DOC, DOCX, and TXT files are allowed`)
        return
      }

      validFiles.push(file)
    })

    // Check total file count
    const totalFiles = uploadedFiles.length + validFiles.length
    if (totalFiles > 5) {
      newErrors.push('Maximum 5 files allowed')
      return
    }

    setUploadErrors(newErrors)
    
    if (validFiles.length > 0) {
      const updatedFiles = [...uploadedFiles, ...validFiles]
      setUploadedFiles(updatedFiles)
      setValue('files', updatedFiles, { shouldValidate: true })
    }

    // Reset input
    event.target.value = ''
  }, [uploadedFiles, setValue])

  const removeFile = useCallback((index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(updatedFiles)
    setValue('files', updatedFiles.length > 0 ? updatedFiles : undefined, { shouldValidate: true })
  }, [uploadedFiles, setValue])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Files & Additional Information</CardTitle>
        <CardDescription>
          Upload any relevant files and add additional notes to help us understand your project better.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload */}
        <div className="space-y-3">
          <Label>Upload relevant files (Optional)</Label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                    Drop files here or click to upload
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    PDF, DOC, DOCX, TXT up to 5MB each (max 5 files)
                  </span>
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </div>

          {/* Upload Errors */}
          {uploadErrors.length > 0 && (
            <div className="space-y-1">
              {uploadErrors.map((error, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Uploaded Files:</Label>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">{file.name}</div>
                      <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="text-xs text-gray-500">
            <strong>Helpful files to include:</strong>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>Sample data files you work with</li>
              <li>Screenshots of current processes</li>
              <li>Existing reports or templates</li>
              <li>Documentation of current workflows</li>
            </ul>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
          <Textarea
            id="additionalNotes"
            placeholder="Any additional information that would help us understand your project better? Special requirements, constraints, or questions you have?"
            rows={4}
            {...register('additionalNotes')}
            aria-invalid={errors.additionalNotes ? 'true' : 'false'}
            className={errors.additionalNotes ? 'border-red-500' : ''}
          />
          {errors.additionalNotes && (
            <p className="text-sm text-red-500" role="alert">
              {errors.additionalNotes.message}
            </p>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>What happens next?</strong> After you submit this form, we'll review your requirements and get back to you within 24 hours with a detailed proposal, timeline, and next steps.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}