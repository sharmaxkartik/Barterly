import { Button } from "@/components/ui/button";
import { Star, Wheel, Cube } from "./3d-shapes";
import Link from "next/link";

export function Hero() {
  return (
    <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-soft"></div>
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-soft"
          style={{ animationDelay: "-1.5s" }}
        ></div>
      </div>

      <div className="container relative">
        <Wheel className="absolute top-12 right-12 md:right-24 opacity-80 hidden md:block animate-rotate-slow" />
        <Star
          className="absolute -bottom-12 -left-12 md:left-24 opacity-60 hidden md:block animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <Cube
          className="absolute top-1/2 left-0 opacity-40 hidden lg:block animate-float"
          style={{ animationDelay: "-1s" }}
        />

        <div className="max-w-[800px] mx-auto text-center space-y-8 relative">
          {/* <div className="inline-flex items-center gap-2 rounded-full glass-button px-4 py-1.5 text-sm font-medium mb-4 animate-bounce-subtle">
            <span className="inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
            <span>Just launched — Skill Mint Beta 1.0</span>
          </div> */}

          <h1
            className="text-4xl md:text-6xl font-bold tracking-tighter animate-slide-up neon-glow"
            style={{ animationDelay: "0.2s" }}
          >
            Your Skill <br />
            Your <span className="enhanced-text-gradient">Currency</span>
          </h1>

          <p
            className="text-muted-foreground md:text-xl max-w-[600px] mx-auto animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Celebrate the joy of skill exchange with a platform designed to
            track your progress, motivate your efforts, and celebrate your
            successes.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Link href="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto hover-scale enhanced-gradient text-white purple-glow"
              >
                Register
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto hover-scale glass-button"
              >
                See demo
              </Button>
            </Link>
          </div>

          <div
            className="pt-12 animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            {/* <p className="text-sm font-medium text-muted-foreground mb-6">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                "Acme Corp",
                "Globex",
                "Echo Valley",
                "Soylent",
                "PULSE",
                "APEX",
              ].map((company, index) => (
                <div
                  key={company}
                  className="text-muted-foreground/70 font-semibold text-sm sm:text-base md:text-lg hover-lift"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  {company}
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
