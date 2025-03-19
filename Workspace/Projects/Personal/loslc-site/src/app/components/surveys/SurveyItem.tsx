import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Survey } from "@/types/survey";

export default function SurveyItem({ survey }: { survey: Survey }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{survey.title}</CardTitle>
        <CardDescription>{survey.description}</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
}
