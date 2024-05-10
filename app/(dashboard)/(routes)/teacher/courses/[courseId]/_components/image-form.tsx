"use client"

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required"
  })
})

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditting, setIsEditting] = useState(false);

  const toggleEdit = () => setIsEditting(current => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditting && (
            <div className="text-red-500">Cancel</div>
          )}

          {
            !isEditting && !initialData.imageUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
              </>
            )
          }

          {!isEditting && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {
        !isEditting && (
          !initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image
                alt="Upload"
                fill
                className="object-cover roundedmd"
                src={initialData.imageUrl}
              />
              current image
            </div>
          )
        )
      }

      {
        isEditting && (
          <div>
            <FileUpload
              endPoint="courseImage"
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url })
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </div>
        )
      }
    </div>
  )
}