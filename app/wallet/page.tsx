import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  Clock,
  Download,
  History,
  Info,
  Plus,
  Sparkles,
  CreditCard,
  BadgeCheck,
  X,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WalletPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Skill Wallet</h1>
          <p className="text-muted-foreground">
            Manage your skill tokens and transaction history
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-medium">
                  Skill Balance
                </CardTitle>
                <CardDescription>
                  Your current skill token balance
                </CardDescription>
              </div>
              <Button variant="outline" className="gap-1">
                <Info className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-1">
                  How it works
                </span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div>
                    <div className="text-3xl font-bold">6 hours</div>
                    <div className="text-sm text-muted-foreground">
                      Available skill tokens
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Hours
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Skill Hours</DialogTitle>
                          <DialogDescription>
                            Add hours to your skill wallet by providing services
                            to others.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="skill">Skill Provided</Label>
                            <Select>
                              <SelectTrigger id="skill">
                                <SelectValue placeholder="Select skill" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="web-design">
                                  Web Design
                                </SelectItem>
                                <SelectItem value="ux-design">
                                  UX Design
                                </SelectItem>
                                <SelectItem value="graphic-design">
                                  Graphic Design
                                </SelectItem>
                                <SelectItem value="development">
                                  Web Development
                                </SelectItem>
                                <SelectItem value="content">
                                  Content Writing
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="recipient">Recipient</Label>
                            <Input
                              id="recipient"
                              placeholder="Username or email"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="hours">Hours</Label>
                              <Input
                                id="hours"
                                type="number"
                                min="1"
                                placeholder="2"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="date">Date</Label>
                              <Input id="date" type="date" />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Describe the service provided"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add Hours</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <History className="mr-2 h-4 w-4" />
                          Request Hours
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Request Skill Hours</DialogTitle>
                          <DialogDescription>
                            Request hours from someone who received your
                            services.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="skill-provided">
                              Skill Provided
                            </Label>
                            <Select>
                              <SelectTrigger id="skill-provided">
                                <SelectValue placeholder="Select skill" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="web-design">
                                  Web Design
                                </SelectItem>
                                <SelectItem value="ux-design">
                                  UX Design
                                </SelectItem>
                                <SelectItem value="graphic-design">
                                  Graphic Design
                                </SelectItem>
                                <SelectItem value="development">
                                  Web Development
                                </SelectItem>
                                <SelectItem value="content">
                                  Content Writing
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="recipient-request">
                              Request From
                            </Label>
                            <Input
                              id="recipient-request"
                              placeholder="Username or email"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="hours-request">Hours</Label>
                              <Input
                                id="hours-request"
                                type="number"
                                min="1"
                                placeholder="2"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="date-request">Date</Label>
                              <Input id="date-request" type="date" />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description-request">
                              Description
                            </Label>
                            <Textarea
                              id="description-request"
                              placeholder="Describe the service provided"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Send Request</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">Monthly Activity</span>
                    </div>
                    <div className="font-medium">
                      <span className="text-emerald-500">+12h</span> /{" "}
                      <span className="text-red-500">-18h</span>
                    </div>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Quick Stats</CardTitle>
              <CardDescription>Your skill exchange statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Total Hours Given</span>
                </div>
                <span className="font-bold">124</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">
                    Total Hours Received
                  </span>
                </div>
                <span className="font-bold">118</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">
                    Skill Trader Level
                  </span>
                </div>
                <Badge>Gold</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Transaction History</h2>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="incoming">Incoming</TabsTrigger>
              <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Skill</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="Sarah Johnson"
                              />
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                Sarah Johnson
                              </p>
                              <p className="text-xs text-muted-foreground">
                                UX Designer
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>UX Design</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-red-500">
                            <ArrowUp className="h-4 w-4" />
                            <span>4 hours</span>
                          </div>
                        </TableCell>
                        <TableCell>Apr 15, 2023</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          >
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="Michael Brown"
                              />
                              <AvatarFallback>MB</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                Michael Brown
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Content Writer
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>Content Writing</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-emerald-500">
                            <ArrowDown className="h-4 w-4" />
                            <span>3 hours</span>
                          </div>
                        </TableCell>
                        <TableCell>Apr 10, 2023</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          >
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="Alex Kim"
                              />
                              <AvatarFallback>AK</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">Alex Kim</p>
                              <p className="text-xs text-muted-foreground">
                                Mobile Developer
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>UI Design</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-red-500">
                            <ArrowUp className="h-4 w-4" />
                            <span>2 hours</span>
                          </div>
                        </TableCell>
                        <TableCell>Apr 5, 2023</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                          >
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                  <Button variant="ghost" size="sm">
                    Previous
                  </Button>
                  <Button variant="ghost" size="sm">
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Other tabs would have similar content but filtered */}
            <TabsContent value="incoming" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <ArrowDown className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      No incoming transactions
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't received any skill hours yet.
                    </p>
                    <Button variant="outline">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Request Hours
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="outgoing" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Skill</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="Sarah Johnson"
                              />
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                Sarah Johnson
                              </p>
                              <p className="text-xs text-muted-foreground">
                                UX Designer
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>UX Design</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-red-500">
                            <ArrowUp className="h-4 w-4" />
                            <span>4 hours</span>
                          </div>
                        </TableCell>
                        <TableCell>Apr 15, 2023</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          >
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="Alex Kim"
                              />
                              <AvatarFallback>AK</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">Alex Kim</p>
                              <p className="text-xs text-muted-foreground">
                                Mobile Developer
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>UI Design</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-red-500">
                            <ArrowUp className="h-4 w-4" />
                            <span>2 hours</span>
                          </div>
                        </TableCell>
                        <TableCell>Apr 5, 2023</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                          >
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Skill</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src="/placeholder-user.jpg"
                                alt="Alex Kim"
                              />
                              <AvatarFallback>AK</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">Alex Kim</p>
                              <p className="text-xs text-muted-foreground">
                                Mobile Developer
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>UI Design</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-red-500">
                            <ArrowUp className="h-4 w-4" />
                            <span>2 hours</span>
                          </div>
                        </TableCell>
                        <TableCell>Apr 5, 2023</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                          >
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <BadgeCheck className="h-4 w-4 text-emerald-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Download your skill exchange reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Summary of all your skill exchanges for the current month.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Skill Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Detailed breakdown of hours by skill category.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">User Exchanges</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Report showing exchanges with specific users.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Tax Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Summary of skill exchanges for tax purposes.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
