import { Button } from "@/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
// import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log("success");
      navigate("/dashboard/home");
    },
  });

  const handleLoginSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log("data", { email, password });

    if (!email || !password) {
      toast.error("Please enter email and password");
      // alert("Please enter email and password");
      return;
    }

    await mutation.mutateAsync({ email, password }); // Wait for mutation completion

    // Check if mutation has error
    if (mutation.isError) {
      toast.error("Login failed. Please try again."); // Display error notification
    } else {
      // Login successful
      toast.success("Login successful!"); // Display success notification
      navigate("/dashboard/home");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-slate-200">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account. <br />
              {mutation.isError && (
                <span className="text-red-500 text-sm">
                  {"Something went wrong"}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input ref={passwordRef} id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Button
                onClick={handleLoginSubmit}
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <LoaderCircle className="animate-spin" />
                )}

                <span className="ml-2">Sign in</span>
              </Button>

              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to={"/auth/register"} className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
