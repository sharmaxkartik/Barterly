import { Cube, Star } from "./3d-shapes"

export function DashboardPreview() {
  return (
    <section className="py-16 md:py-24 bg-muted/50 dark:bg-muted/20 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/3 opacity-50">
        <Star className="opacity-70 animate-float" style={{ animationDelay: "-3s" }} />
      </div>
      <div className="absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/3 opacity-50">
        <Cube className="opacity-70 animate-float" style={{ animationDelay: "-1.5s" }} />
      </div>

      <div className="container">
        <div className="text-center mb-16 max-w-3xl mx-auto animate-slide-up">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4 enhanced-text-gradient">
            Intuitive interface
          </h2>
          <p className="text-muted-foreground">
            Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and
            celebrate your successes, one task at a time.
          </p>
        </div>

        <div className="relative glass-card rounded-xl shadow-xl p-2 md:p-4 max-w-5xl mx-auto transition-all duration-500 hover:shadow-2xl hover:transform hover:scale-[1.01] neon-border">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="px-4 py-1 rounded-full glass-button text-xs">Search</div>
            </div>

            <div className="flex gap-4">
              <div className="hidden md:block w-16 flex-shrink-0 bg-muted rounded-lg">
                <div className="flex flex-col items-center gap-6 p-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-md ${i === 0 ? "bg-purple-500/50" : "bg-muted-foreground/20"} transition-all duration-300 hover:bg-purple-500/30`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex-1 min-h-[400px]">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">Launch</h3>
                  <div className="text-sm text-muted-foreground mb-4">Friday</div>
                </div>

                {[
                  { title: "Design landing page layout", status: "Done", progress: "100%" },
                  {
                    title: "Prepare marketing launch campaigns and social media posts",
                    status: "In Progress",
                    progress: "75%",
                  },
                  { title: "Implement front-end registration", status: "In Progress", progress: "40%" },
                  { title: "Add authentication features", status: "Not Started", progress: "0%" },
                ].map((task, i) => (
                  <div
                    key={i}
                    className="border-b border-purple-500/10 py-3 flex items-center justify-between transition-all duration-300 hover:bg-purple-500/5 rounded px-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            task.status === "Done"
                              ? "bg-green-500"
                              : task.status === "In Progress"
                                ? "bg-yellow-500"
                                : "bg-gray-300"
                          }`}
                        ></div>
                        <span className="font-medium">{task.title}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{task.progress}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
