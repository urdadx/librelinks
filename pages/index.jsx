/* eslint-disable @next/next/no-img-element */
import GithubStar from "@/components/utils/github-star";
import { GithubIcon, GlobeIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";


const Home = () => {
	return (
		<>
			<Head>
				<title>Librelinks | A free and opensource link in bio tool</title>
			</Head>		
			<div className="bg-white">
				<div className="relative overflow-hidden">
					<div className="absolute inset-y-0 w-full h-full" aria-hidden="true">
						<div className="relative h-full">
							<svg
								className="absolute transform right-full translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
								width={404}
								height={784}
								fill="none"
								viewBox="0 0 404 784">
								<defs>
									<pattern
										id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
										x={0}
										y={0}
										width={20}
										height={20}
										patternUnits="userSpaceOnUse">
										<rect
											x={0}
											y={0}
											width={4}
											height={4}
											className="text-gray-200"
											fill="currentColor"
										/>
									</pattern>
								</defs>
								<rect
									width={404}
									height={784}
									fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
								/>
							</svg>
							<svg
								className="absolute transform left-full -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
								width={404}
								height={784}
								fill="none"
								viewBox="0 0 404 784">
								<defs>
									<pattern
										id="d2a68204-c383-44b1-b99f-42ccff4e5365"
										x={0}
										y={0}
										width={20}
										height={20}
										patternUnits="userSpaceOnUse">
										<rect
											x={0}
											y={0}
											width={4}
											height={4}
											className="text-gray-200"
											fill="currentColor"
										/>
									</pattern>
								</defs>
								<rect
									width={404}
									height={784}
									fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
								/>
							</svg>
						</div>
					</div>
					<div className="relative pt-6 pb-16 sm:pb-24">
						<div className="px-4 mx-auto max-w-7xl sm:px-6">
							<nav
								className="relative flex items-center justify-between md:justify-start"
								aria-label="Global">
								<Link
									className="flex items-center gap-2 font-bold text-xl"
									href="/">
									<h3 className="lg:block">Librelinks</h3>
								</Link>

								<div className="relative items-center w-28 z-10 md:absolute md:inset-y-0 md:right-0">
									<Link
										className="group inline-flex items-center gap-2 px-4 text-sm  bg-slate-900 border rounded-3xl text-white w-[116px] h-[35px] justify-center font-semibold transition-colors hover:bg-slate-700"
										rel="noopener noreferrer"
										href="/admin">
										Login
									</Link>
								</div>
							</nav>
						</div>
						<div className="px-4 mx-auto mt-24 max-w-7xl sm:mt-16 sm:px-6">
							<div className="flex justify-center items-center mb-6">
								<a
									className="group inline-flex items-center gap-2 px-4 py-4 text-sm bg-gray-50 border rounded-3xl text-gray-500 w-[180px] h-[35px] justify-center transition-colors hover:bg-gray-100"
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/urdadx/librelinks">
									<div className="">
										<GithubStar />
									</div>{" "}
									Star us on Github
								</a>
							</div>	
							<div className="text-center">
								<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
									<span className="block">
										The free & opensource
									</span>
									<span className="hero-title block ">
										link in bio tool
									</span>
								</h1>
								<p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
									Librelinks is an opensource link in bio tool
									that helps you easily manage your links,
									transforming your online presence.
								</p>
							</div>
							<div className="flex justify-center mt-6">
								<div className="flex flex-col items-center">
									<span className="inline-flex rounded-md shadow ">
										<Link legacyBehavior href="/register">
											<a className="inline-flex items-center px-4 py-2 font-medium text-lg gradient-btn border border-transparent rounded-xl text-white w-[190px] h-[50px] justify-center hover:shadow-lg">
												Get started
											</a>
										</Link>
									</span>
								</div>
							</div>
					
						</div>
					</div>
					<div className="relative">
						<div
							className="absolute inset-0 flex flex-col"
							aria-hidden="true">
							<div className="flex-1" />
							<div className="flex-1 w-full bg-slate-900" />
						</div>
						<div className="px-4 mx-auto max-w-7xl sm:px-6">
							<Image
								className="relative rounded-lg shadow-lg"
								src="/assets/new_shot.png"
								alt="App screenshot"
								height={700}
								width={1200}
							/>
						</div>
					</div>
				</div>
				<div className="bg-slate-900">
					<div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
						<h2 className="text-lg font-semibold tracking-wide text-center text-gray-400">
							Made by{" "}
							<a
								className="hover:text-emerald-500"
								target="_blank"
								rel="noopener noreferrer"
								href="https://twitter.com/NerdyProgramme2">
								@urdadx
							</a>
						</h2>
						<div className="flex items-center gap-4 justify-center mt-4">
							<a
								href="https://x.com/NerdyProgramme2"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="twitter logo">
								<TwitterIcon color="white" />
							</a>
							<a
								href="https://github.com/urdadx"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="github logo">
								<GithubIcon color="white" />
							</a>
							<a
								href="https://urdadx.vercel.app/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="insta logo">
								<GlobeIcon color="white" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
