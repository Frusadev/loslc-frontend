import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requestCurrentUser } from "@/requests/authRequests";
import { CommunityEvent } from "@/types/event";
import { User } from "@/types/user";

export function EventCarouselItem({ cEvent }: { cEvent: CommunityEvent }) {
  let user: User
  requestCurrentUser().then((u) => user = u)
  const participate = () => {
    
  }
  return (
    <Card className="w-full m-2">
      <CardHeader>
        <CardTitle>
          {cEvent.title}
        </CardTitle>
        <CardDescription>
          <ul>
            <li>{new Date(cEvent.date).toDateString()}</li>
            <li>{cEvent.location}</li>
            <li>{cEvent.location}</li>
          </ul>
          {cEvent.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img src={cEvent.coverImageUrl} alt="Event cover" className="object-cover"/>
        <Button>Participate</Button>
      </CardContent>
    </Card>
  )
}

export function EventCarousel() {}
