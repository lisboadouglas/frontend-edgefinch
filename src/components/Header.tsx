import React from "react";

const Header: React.FC = () => {
    return (
        <>
            <header className="min-h-[10rem]">
                <div aria-hidden="true"
                    className="flex absolute -top-96 start-1/2 transform -translate-x-1/2 lg:-top-64 lg:translate-x-0">
                    <div
                        className="bg-gradient-to-r from-green-100/50 to-green-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]">
                    </div>
                    <div
                        className="bg-gradient-to-tl from-green-50/50 to-green-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]">
                    </div>
                </div>
                <div className="container flex flex-col mx-auto ">
                    <div className="relative flex flex-wrap items-center justify-between w-full  group py-7 shrink-0">
                        <div className="flex items-center gap-3">
                            <p className="text-xl font-bold">Simule já</p>
                        </div>

                    </div>
                </div>
            </header>
        </>
    );
}
export default Header;