import { LoginForm } from "@/src/components/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative bg-zinc-50 dark:bg-zinc-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="z-10 w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
