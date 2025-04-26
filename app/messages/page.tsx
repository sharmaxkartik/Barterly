import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, MoreHorizontal, Paperclip, Search, SendHorizonal, Video } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">Communicate with other users and schedule skill exchanges</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[700px]">
          {/* Contacts/Conversations List */}
          <Card className="col-span-1 overflow-hidden flex flex-col h-full">
            <CardHeader className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Search conversations..." />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto">
              <div className="divide-y">
                <ConversationItem
                  name="Sarah Johnson"
                  message="When would you be available for our UX design session?"
                  time="Just now"
                  unread={true}
                  active={true}
                />
                <ConversationItem
                  name="Michael Brown"
                  message="Thanks for the help with my website! I'll have your content ready by Friday."
                  time="2 hours ago"
                  unread={true}
                />
                <ConversationItem
                  name="Emily Chen"
                  message="The logo looks amazing! Could we schedule a call to discuss the brand colors?"
                  time="Yesterday"
                />
                <ConversationItem
                  name="Alex Martinez"
                  message="I've sent you the React code snippets we discussed."
                  time="2 days ago"
                />
                <ConversationItem
                  name="Jessica Lee"
                  message="Would 3 hours of content writing be enough for 2 hours of your graphic design?"
                  time="3 days ago"
                />
                <ConversationItem
                  name="David Wilson"
                  message="I've shared my screen recording with the issue I'm having."
                  time="1 week ago"
                />
              </div>
            </CardContent>
          </Card>

          {/* Current Conversation */}
          <Card className="col-span-2 overflow-hidden flex flex-col h-full">
            <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-xs text-muted-foreground">UX Designer • Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Calendar className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 overflow-auto flex flex-col space-y-4">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">
                      Hi John! I was wondering if you'd be available to help me with some UX work for my new app. I
                      could offer content writing in exchange.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">10:30 AM</span>
                </div>
              </div>

              <div className="flex items-start flex-row-reverse space-x-2 space-x-reverse max-w-[80%] self-end">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="You" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-primary p-3 rounded-lg text-primary-foreground">
                    <p className="text-sm">
                      Hey Sarah! I'd definitely be interested. What kind of UX work do you need specifically? And how
                      many hours are you thinking?
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 text-right block">10:32 AM</span>
                </div>
              </div>

              <div className="flex items-start space-x-2 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">
                      I need help with wireframing and user flow for a fitness tracking app. I'm thinking maybe 4-5
                      hours total? I could offer the same amount of content writing hours.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">10:35 AM</span>
                </div>
              </div>

              <div className="flex items-start space-x-2 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">Here's a rough sketch of what I'm thinking for the main dashboard.</p>
                  </div>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <img src="/placeholder.svg?height=200&width=300" alt="Sketch" className="w-full h-auto max-w-xs" />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">10:36 AM</span>
                </div>
              </div>

              <div className="flex items-start flex-row-reverse space-x-2 space-x-reverse max-w-[80%] self-end">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="You" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-primary p-3 rounded-lg text-primary-foreground">
                    <p className="text-sm">
                      This looks like a good start! I'd be happy to help with the wireframing and user flow. 5 hours
                      sounds fair for this scope.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 text-right block">10:40 AM</span>
                </div>
              </div>

              <div className="flex items-start flex-row-reverse space-x-2 space-x-reverse max-w-[80%] self-end">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="You" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-primary p-3 rounded-lg text-primary-foreground">
                    <p className="text-sm">
                      When would you be available to discuss the details further? I have some time this Thursday
                      afternoon or Friday morning.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 text-right block">10:41 AM</span>
                </div>
              </div>

              <div className="flex items-start space-x-2 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">
                      Thursday afternoon works for me! When would you be available for our UX design session?
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">Just now</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="flex w-full items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon">
                  <SendHorizonal className="h-5 w-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface ConversationItemProps {
  name: string
  message: string
  time: string
  unread?: boolean
  active?: boolean
}

function ConversationItem({ name, message, time, unread = false, active = false }: ConversationItemProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer ${
        active ? "bg-muted/50 border-l-4 border-primary" : ""
      }`}
    >
      <Avatar>
        <AvatarImage src="/placeholder-user.jpg" alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className={`font-medium truncate ${unread ? "font-semibold" : ""}`}>{name}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{time}</span>
        </div>
        <p className={`text-sm truncate ${unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
          {message}
        </p>
      </div>
      {unread && <Badge className="ml-auto">New</Badge>}
    </div>
  )
}
