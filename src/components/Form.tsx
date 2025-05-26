import React, { useState, useRef, useEffect } from "react";
import api from "../services/api";

interface Offer {
  instituicaoFinanceira: string;
  modalidadeCredito: string;
  valorAPagar: number;
  valorSolicitado: number;
  taxaJuros: number;
  qntParcelas: number;
  valorParcela: number;
}

const Form: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const offersRef = useRef<HTMLDivElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  const validateCPF = (cpf: string) => {
    const cleanedCpf = cpf.replace(/\D/g, "");


    if (cleanedCpf.length !== 11) {
      setError("CPF inválido ou não permitido");
      return false;
    }
    setError("");
    return true;
  };

   useEffect(() => {
    if (isLoading && skeletonRef.current) {
      skeletonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCPF(cpf)) return;

    setIsLoading(true);
    setOffers([]);
    setError("");

    try {
      const response = await api.post("/offers", { cpf: cpf });
      const rawOffers = response.data.data;

      const processedOffers = rawOffers.map((offer: any) => ({
        ...offer,
        valorParcela: offer.valorAPagar / offer.qntParcelas 
      }));

    
      const orderedOffers = [
        processedOffers[1],
        processedOffers[0],
        processedOffers[2]  
      ];

      setOffers(orderedOffers);
    } catch (error) {
      console.error("Erro ao buscar ofertas:", error);
      setError("Erro ao carregar ofertas. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }

    if (offersRef.current) {
      offersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };
  const SkeletonLoader = () => (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl shadow-xl animate-pulse"
        >
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 mx-auto"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6 mx-auto"></div>
          <div className="h-10 bg-gray-300 rounded-lg mb-6"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-green-800 text-center mb-6">
            Consultar Ofertas
          </h2>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              CPF
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-lg border ${error ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              maxLength={14}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
            isLoading
              ? "bg-lime-700 cursor-not-allowed"
              : "bg-lime-600 hover:bg-[#172B03]"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Buscando ofertas...
            </div>
          ) : (
            "Consultar"
          )}
        </button>
        </div>
      </form>
      {isLoading && (
        <div ref={skeletonRef}>
          <SkeletonLoader />
        </div>
      )}
      {offers.length > 0 && (
        <div ref={offersRef} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {offers.map((offer, index) => (
            <div
              key={`${offer.instituicaoFinanceira}-${offer.modalidadeCredito}`}
              className={`relative p-6 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 ${index === 1 ? "bg-green-50 border-2 border-lime-500/20" : "bg-white"
                }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#172B03] text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Melhor Opção
                </div>
              )}

              <h3 className="text-xl font-bold text-center mb-4">
                {offer.instituicaoFinanceira}
              </h3>
              <p className="text-center text-sm text-gray-600 mb-2">
                {offer.modalidadeCredito}
              </p>

              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-green-800">
                  {formatCurrency(offer.valorSolicitado)}
                </h2> 
                <span className="text-md font-bold text-green-800">
                  {formatCurrency(offer.valorParcela)}
                </span>
                <span className="text-gray-500 text-sm">/{offer.qntParcelas}x</span>
              </div>

              <button className="w-full py-2 bg-lime-500 text-white rounded-lg font-semibold hover:bg-[#172B03] transition-colors">
                Eu quero essa oferta
              </button>

              <ul className="mt-6 space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Valor Liberado:</span>
                  <span className="font-semibold">{formatCurrency(offer.valorSolicitado)}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Juros/mês:</span>
                  <span className="font-semibold">{offer.taxaJuros.toFixed(2)}%</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Parcelas:</span>
                  <span className="font-semibold">{offer.qntParcelas}x</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Total a Pagar:</span>
                  <span className="font-semibold">{formatCurrency(offer.valorAPagar)}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Form;