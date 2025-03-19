"use client"

import { notFound, useParams } from "next/navigation"
import { toast } from "sonner"


export default function SurveyPage() {
  const params = useParams()
  if (params.surveyId === undefined) {
    notFound()
  }
  const surveyId = params.surveyId.toString()

}
