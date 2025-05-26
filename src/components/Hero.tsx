import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="relative z-10 max-w-full">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-6 py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
                <div className="mt-3 max-w-2xl mb-5">
                    <h1 className="block font-bold text-green-800 text-4xl md:text-5xl lg:text-6xl">
                        Consulte nossas <span className="text-green-500">ofertas de crédito</span> agora!
                    </h1>
                    <div className="mt-8 max-w-3xl">
                            <p className="mt-8 text-lg text-gray-600">Um sistema que visa facilitar e gerenciar sua análise de
                                crédito, consulte quais instituições financeiras oferecem crédito para você.</p>
                        </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Hero;