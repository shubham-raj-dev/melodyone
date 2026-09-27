import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-8">
      <div className="bg-white/40 backdrop-blur-[40px] border border-white/60 rounded-[2rem] p-8 shadow-sm">
        <SignUp />
      </div>
    </div>
  )
}
