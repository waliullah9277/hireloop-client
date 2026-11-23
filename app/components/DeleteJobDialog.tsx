'use client'
import { Trash2, Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteJobs } from "@/lib/actions/jobs/page"
import { Job } from "../dashboard/recruiter/jobs/page"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"

export function DeleteJobDialog({ job }: { job: Job}) {

  const [open, setOpen] = useState(false);
  const router = useRouter();

  
  const handleDelete = async () => {
    const res = await deleteJobs(job._id)
    // console.log(res)
    if (res.deletedCount) {
      setOpen(false)
      toast.add({
        title: "Job deleted",
        description: "The job has been permanently deleted.",
      })
      router.refresh()
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Delete ${job.title}`}
              className="size-8 text-red-400 disabled:opacity-60"
            >
              <Trash2 aria-hidden="true" className="size-3.5" />
            </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this chat conversation. View{" "}
            {job.title} delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
