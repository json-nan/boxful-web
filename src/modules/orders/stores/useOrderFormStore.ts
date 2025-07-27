import { create } from "zustand";
import { OrderFormStep1Data, OrderFormStep2Data } from "../types/order";

interface OrderFormState {
  currentStep: number;
  step1Data: OrderFormStep1Data | null;
  step2Data: OrderFormStep2Data | null;

  setCurrentStep: (step: number) => void;
  setStep1Data: (data: OrderFormStep1Data) => void;
  setStep2Data: (data: OrderFormStep2Data) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetForm: () => void;
}

export const useOrderFormStore = create<OrderFormState>((set, get) => ({
  currentStep: 1,
  step1Data: null,
  step2Data: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  setStep1Data: (data) => set({ step1Data: data }),

  setStep2Data: (data) => set({ step2Data: data }),

  goToNextStep: () => {
    const { currentStep } = get();
    if (currentStep < 2) {
      set({ currentStep: currentStep + 1 });
    }
  },

  goToPreviousStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  resetForm: () =>
    set({
      currentStep: 1,
      step1Data: null,
      step2Data: null,
    }),
}));
