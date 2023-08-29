/* eslint-disable @next/next/no-img-element */
import { signIn } from "next-auth/react";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { TinyLoader } from "@/components/utils/tiny-loader";
import Link from "next/link";
import { GithubIcon, Wand } from "lucide-react";
import GoogleIcon from "@/components/utils/google-icon";
import { GridOverlay } from "@/components/utils/grid-overlay";
import Head from "next/head";

export default function Register() {
	const [isLoading, setIsLoading] = useState(false);

	const handleGoogleSignIn = useCallback(async () => {
		try {
			setIsLoading(true);
			signIn("google");
		} catch (error) {
			toast.error("An error occured");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const handleGithubSignIn = useCallback(async () => {
		try {
			setIsLoading(true);
			signIn("github");
		} catch (error) {
			toast.error("An error occured");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Librelinks | Register</title>
			</Head>
			<GridOverlay />
			<div className="absolute w-full flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="mx-auto h-[30px] w-[30px] rounded-full">
						<Wand color="black" size={30} />
					</div>
					<h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create a new account
					</h2>
				</div>
				<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="space-y-6">
						<div>
							<button
								onClick={handleGithubSignIn}
								className="flex w-full justify-center rounded-md bg-slate-900 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">
								{isLoading ? (
									<>
										<div className="flex justify-center w-[100px]">
											<TinyLoader
												color="white"
												size={20}
												stroke={2}
											/>
										</div>
									</>
								) : (
									<span className="flex items-center gap-2">
										<GithubIcon size={17} />{" "}
										<span className="text-md">
											Continue with Github
										</span>
									</span>
								)}
							</button>
						</div>
					</div>

					<div className="mt-4">
						<button
							onClick={handleGoogleSignIn}
							className="flex w-full justify-center rounded-md bg-white px-3 py-2.5 text-sm font-semibold leading-6 text-slate-900  outline-none border-2 hover:bg-gray-100 hover:border-slate-700">
							{isLoading ? (
								<>
									<div className="flex justify-center w-[100px]">
										<TinyLoader
											color="white"
											size={20}
											stroke={2}
										/>
									</div>
								</>
							) : (
								<span className="flex items-center gap-2">
									<GoogleIcon />{" "}
									<span className="text-md">
										Continue with Google
									</span>
								</span>
							)}
						</button>
					</div>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an account?{" "}
						<Link
							href="/login"
							className="font-semibold leading-6 text-slate-600 hover:text-slate-500">
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
