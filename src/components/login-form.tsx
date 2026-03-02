"use client";

import { Hexagon } from "lucide-react";
import { ModeToggle } from "@/src/components/mode-toggle";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { useState } from "react";
import { auth } from "../server/auth/auth";
import { authClient } from "../server/auth/auth-client";
import { useRouter } from "next/navigation";

export function LoginForm() {
	const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
	const [loading, setLoading] = useState(false);
	const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
	const [signupFormData, setSignupFormData] = useState({ name: "", email: "", password: "" });

	const router = useRouter();

	const handleLogin = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setLoading(true);

		const { error } = await authClient.signIn.email({
			email: loginFormData.email,
			password: loginFormData.password,
		});

		if (error) {
			console.log(error);
		} else {
			router.push("/dashboard");
		}

		setLoading(false);
	};

	const handleSignUp = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setLoading(true);

		const { error } = await authClient.signUp.email({
			email: signupFormData.email,
			name: signupFormData.name,
			password: signupFormData.password,
		});

		if (error) {
			console.log(error);
		} else {
			router.push("/dashboard");
		}

		setLoading(false);
	};

	return (
		<>
			<ModeToggle />
			<div className="flex flex-col gap-6">
				<div className="flex flex-col items-center gap-2">
					<a href="#" className="flex flex-col items-center gap-2 font-medium">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
							<Hexagon className="h-6 w-6" strokeWidth={2.5} />
						</div>
						<span className="text-xl font-bold tracking-tight">Kore</span>
					</a>
				</div>

				<Tabs
					defaultValue="login"
					className="w-full"
					onValueChange={(v) => setActiveTab(v as "login" | "signup")}
				>
					<TabsList className="grid w-full grid-cols-2 shadow-sm rounded-xl mb-4">
						<TabsTrigger value="login" className="rounded-lg">
							Log in
						</TabsTrigger>
						<TabsTrigger value="signup" className="rounded-lg">
							Sign up
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="login"
						className="mt-0 focus-visible:outline-none focus-visible:ring-0"
					>
						<Card className="border-zinc-200 shadow-sm dark:border-zinc-800 rounded-xl overflow-hidden">
							<CardHeader className="text-center pb-4">
								<CardTitle className="text-xl">Welcome back</CardTitle>
								<CardDescription>Enter your email below to login to your account</CardDescription>
							</CardHeader>
							<CardContent className="pb-4">
								<form onSubmit={handleLogin}>
									<div className="grid gap-4">
										<div className="grid gap-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												type="email"
												placeholder="m@example.com"
												required
												className="rounded-lg"
												value={loginFormData.email}
												onChange={(e) => {
													setLoginFormData({ ...loginFormData, email: e.target.value });
												}}
											/>
										</div>
										<div className="grid gap-2">
											<div className="flex items-center">
												<Label htmlFor="password">Password</Label>
												<a
													href="#"
													className="ml-auto inline-block text-sm text-zinc-500 hover:text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
												>
													Forgot your password?
												</a>
											</div>
											<Input
												id="password"
												type="password"
												required
												className="rounded-lg"
												value={loginFormData.password}
												onChange={(e) => {
													setLoginFormData({ ...loginFormData, password: e.target.value });
												}}
											/>
										</div>
										<Button type="submit" className="w-full rounded-lg">
											Log in
										</Button>
									</div>
								</form>
							</CardContent>
							<AuthSocialFooter action="Log in" />
						</Card>
					</TabsContent>

					<TabsContent
						value="signup"
						className="mt-0 focus-visible:outline-none focus-visible:ring-0"
					>
						<Card className="border-zinc-200 shadow-sm dark:border-zinc-800 rounded-xl overflow-hidden">
							<CardHeader className="text-center pb-4">
								<CardTitle className="text-xl">Create an account</CardTitle>
								<CardDescription>Enter your details below to create your account</CardDescription>
							</CardHeader>
							<CardContent className="pb-4">
								<form onSubmit={handleSignUp}>
									<div className="grid gap-4">
										<div className="grid gap-2">
											<Label htmlFor="name">Full Name</Label>
											<Input
												id="name"
												type="text"
												placeholder="John Doe"
												required
												className="rounded-lg"
												value={}
											/>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="signup-email">Email</Label>
											<Input
												id="signup-email"
												type="email"
												placeholder="m@example.com"
												required
												className="rounded-lg"
											/>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="signup-password">Password</Label>
											<Input id="signup-password" type="password" required className="rounded-lg" />
										</div>
										<Button type="submit" className="w-full rounded-lg">
											Sign up
										</Button>
									</div>
								</form>
							</CardContent>
							<AuthSocialFooter action="Sign up" />
						</Card>
					</TabsContent>
				</Tabs>

				<div className="text-balance text-center text-xs text-zinc-500 dark:text-zinc-400">
					By clicking continue, you agree to our{" "}
					<a href="#" className="underline underline-offset-4 hover:text-primary">
						Terms of Service
					</a>{" "}
					and{" "}
					<a href="#" className="underline underline-offset-4 hover:text-primary">
						Privacy Policy
					</a>
					.
				</div>
			</div>
		</>
	);
}

function AuthSocialFooter({ action }: { action: string }) {
	return (
		<>
			<div className="relative mx-6 mt-2 mb-6">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-white px-2 text-zinc-500 dark:min-w-fit dark:bg-zinc-950 dark:text-zinc-400">
						or continue with
					</span>
				</div>
			</div>
			<CardFooter className="flex flex-col gap-3">
				<Button variant="outline" className="w-full rounded-lg" type="button">
					<svg
						className="mr-2 h-4 w-4"
						aria-hidden="true"
						focusable="false"
						data-prefix="fab"
						data-icon="google"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 488 512"
					>
						<path
							fill="currentColor"
							d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
						></path>
					</svg>
					Google
				</Button>
				<Button variant="outline" className="w-full rounded-lg" type="button">
					<svg
						className="mr-2 h-4 w-4"
						aria-hidden="true"
						focusable="false"
						data-prefix="fab"
						data-icon="facebook"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 320 512"
					>
						<path
							fill="currentColor"
							d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
						></path>
					</svg>
					Facebook
				</Button>
			</CardFooter>
		</>
	);
}
