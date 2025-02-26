import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";

export default function PasswordChangeComp() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-900/90">
      <form className="max-w-xl w-full h-[450px] flex justify-center items-center mx-auto bg-white/80 rounded">
        <div>
          <div className="w-full space-y-4 flex flex-col justify-center">
            <div>
              <label className="text-black">Email:</label>
              <Input type="text" label="Email" />
            </div>
            <div>
              <label className="text-black">Current password:</label>
              <Input type="password" label="Password" />
            </div>
            <div>
              <label className="text-black">Enter new password:</label>
              <Input type="password" label="Password" />
            </div>
            <Button color="primary">Change Password</Button>

            <div className="flex justify-center font-bold text-blue-500">
              <Link href={"/profile/forgot-password"}>Forgot password?</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
