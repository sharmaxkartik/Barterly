"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Video,
  Mic,
  MicOff,
  VideoOff,
  ScreenShare,
  PhoneOff,
  MessageSquare,
  Users,
  FileUp,
  Paperclip,
  SendHorizonal,
  Plus,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SessionsPage() {
  const [activeSession, setActiveSession] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Live Sessions</h1>
          <p className="text-muted-foreground">Video, file sharing, and collaborative tools for skill exchanges</p>
        </div>

        {activeSession ? (
          <ActiveSession onEndSession={() => setActiveSession(false)} />
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <ScheduledSessions onJoinSession={() => setActiveSession(true)} />
            <StartNewSession onStartSession={() => setActiveSession(true)} />
          </div>
        )}
      </div>
    </div>
  )
}

function ActiveSession({ onEndSession }: { onEndSession: () => void }) {
  const [micMuted, setMicMuted] = useState(false)
  const [videoOff, setVideoOff] = useState(false)
  const [activeTab, setActiveTab] = useState("video")

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            Live Session
          </Badge>
          <span className="text-sm text-muted-foreground">1:24:35</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">With Sarah Johnson</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="Sarah Johnson" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Card className="overflow-hidden h-[600px] flex flex-col">
        <div className="p-2 bg-background border-b flex gap-2">
          <Button
            variant={activeTab === "video" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("video")}
            className="rounded-full"
          >
            <Video className="h-4 w-4 mr-2" />
            Video
          </Button>
          <Button
            variant={activeTab === "chat" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("chat")}
            className="rounded-full"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </Button>
          <Button
            variant={activeTab === "participants" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("participants")}
            className="rounded-full"
          >
            <Users className="h-4 w-4 mr-2" />
            Participants (2)
          </Button>
          <Button
            variant={activeTab === "files" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("files")}
            className="rounded-full"
          >
            <FileUp className="h-4 w-4 mr-2" />
            Files
          </Button>
        </div>

        <div className="flex-1 relative">
          {/* Video View */}
          {activeTab === "video" && (
            <div className="h-full flex items-center justify-center bg-black">
              <div className="relative w-full h-full">
                <Image src="/placeholder.svg?height=500&width=800" fill alt="Video Stream" className="object-contain" />
                <div className="absolute bottom-4 right-4 w-32 h-24 border-2 border-background bg-muted">
                  <div className="relative w-full h-full">
                    <Image src="/placeholder.svg?height=100&width=120" fill alt="Your Video" className="object-cover" />
                    {videoOff && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <VideoOff className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat */}
          {activeTab === "chat" && (
            <div className="h-full flex flex-col p-4">
              <div className="flex-1 overflow-auto space-y-4 mb-4">
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Sarah Johnson" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      So I'm thinking we could use a more minimalist approach for the main dashboard. What do you think?
                    </p>
                    <span className="text-xs text-muted-foreground mt-1">10:30 AM</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-row-reverse">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="You" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="bg-primary rounded-lg p-3 text-primary-foreground max-w-[80%]">
                    <p className="text-sm">
                      I agree. Let me share some examples of minimalist dashboards that I think would work well for
                      this.
                    </p>
                    <span className="text-xs text-muted-foreground/80 mt-1">10:32 AM</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon" className="rounded-full">
                  <SendHorizonal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Participants */}
          {activeTab === "participants" && (
            <div className="h-full p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="You" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe (You)</p>
                      <p className="text-xs text-muted-foreground">Host</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {micMuted && <MicOff className="h-4 w-4 text-muted-foreground" />}
                    {videoOff && <VideoOff className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Sarah Johnson" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Participant</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MicOff className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Files */}
          {activeTab === "files" && (
            <div className="h-full p-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Shared Files</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Share File
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted size-10 rounded flex items-center justify-center">
                        <FileUp className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">dashboard-wireframe.png</p>
                        <p className="text-xs text-muted-foreground">2.4 MB • Shared by Sarah Johnson</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted size-10 rounded flex items-center justify-center">
                        <FileUp className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">user-flow-diagram.pdf</p>
                        <p className="text-xs text-muted-foreground">1.8 MB • Shared by You</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-background flex items-center justify-center gap-2">
          <Button
            variant={micMuted ? "destructive" : "outline"}
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={() => setMicMuted(!micMuted)}
          >
            {micMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            variant={videoOff ? "destructive" : "outline"}
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={() => setVideoOff(!videoOff)}
          >
            {videoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
            <ScreenShare className="h-5 w-5" />
          </Button>
          <Button variant="destructive" size="icon" className="rounded-full h-12 w-12" onClick={onEndSession}>
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

function ScheduledSessions({ onJoinSession }: { onJoinSession: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
        <CardDescription>Your scheduled skill exchange sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">UX Design Session with Sarah Johnson</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Today, 2:00 PM</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>1 hour</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={onJoinSession}>
                <Video className="mr-2 h-4 w-4" />
                Join Session
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Mobile Development with Alex Kim</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Tomorrow, 10:00 AM</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>2 hours</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline">Reschedule</Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Content Writing with Emily Wilson</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Friday, 3:30 PM</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>1.5 hours</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline">Reschedule</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StartNewSession({ onStartSession }: { onStartSession: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a New Session</CardTitle>
        <CardDescription>Begin a new skill exchange session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Instant Session</CardTitle>
                <CardDescription>Start a session right now</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Perfect for spontaneous collaboration when both parties are available.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Video className="mr-2 h-4 w-4" />
                      Start Instant Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Start Instant Session</DialogTitle>
                      <DialogDescription>Create a new session and invite participants.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="session-name">Session Name</Label>
                        <Input id="session-name" placeholder="E.g., UX Design Collaboration" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="invite">Invite Participants</Label>
                        <div className="flex gap-2">
                          <Input id="invite" placeholder="Enter email or username" className="flex-1" />
                          <Button type="button" variant="secondary">
                            <Plus className="h-4 w-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder-user.jpg" alt="Sarah Johnson" />
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">sarah.johnson@example.com</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid gap-2">
                        <Label htmlFor="session-notes">Session Notes (Optional)</Label>
                        <Textarea id="session-notes" placeholder="Enter any notes or agenda items" rows={3} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={onStartSession}>Start Session</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Scheduled Session</CardTitle>
                <CardDescription>Plan a future session</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule a session for a future date and time when both parties are available.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Schedule a Session</DialogTitle>
                      <DialogDescription>Set up a future skill exchange session.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="session-name-scheduled">Session Name</Label>
                        <Input id="session-name-scheduled" placeholder="E.g., UX Design Collaboration" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="session-date">Date</Label>
                          <Input id="session-date" type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="session-time">Time</Label>
                          <Input id="session-time" type="time" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="session-duration">Duration</Label>
                        <Select>
                          <SelectTrigger id="session-duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30min">30 minutes</SelectItem>
                            <SelectItem value="1h">1 hour</SelectItem>
                            <SelectItem value="1h30m">1 hour 30 minutes</SelectItem>
                            <SelectItem value="2h">2 hours</SelectItem>
                            <SelectItem value="3h">3 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="invite-scheduled">Invite Participants</Label>
                        <div className="flex gap-2">
                          <Input id="invite-scheduled" placeholder="Enter email or username" className="flex-1" />
                          <Button type="button" variant="secondary">
                            <Plus className="h-4 w-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="session-notes-scheduled">Session Notes (Optional)</Label>
                        <Textarea id="session-notes-scheduled" placeholder="Enter any notes or agenda items" rows={3} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Schedule Session</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
