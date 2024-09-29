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
import useTokenStore from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderCircle, Eye, EyeOff } from "lucide-react"; // Icons for show/hide password
import GridPattern from "@/components/magicui/animated-grid-pattern";

const LoginPage = () => {
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.data.accessToken);
      navigate("/dashboard/home");
    },
  });

  const handleLoginSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log("data", { email, password });

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    await mutation.mutateAsync({ email, password });

    if (mutation.isError) {
      toast.error("Login failed. Please try again.");
    } else {
      toast.success("Login successful!");
      navigate("/dashboard/home");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
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
                defaultValue="demouser@gmail.com" // Default email value
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                ref={passwordRef}
                id="password"
                type={showPassword ? "text" : "password"} // Toggle between text and password type
                placeholder="Enter your password"
                defaultValue="imdemouser123" // Default password value
                required
              />
              <div
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility on icon click
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
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
        <GridPattern className="-z-20" />
      </div>
    </div>
  );
};

export default LoginPage;
