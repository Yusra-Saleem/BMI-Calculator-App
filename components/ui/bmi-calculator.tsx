"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, ChangeEvent } from "react";

// Import custom UI components from the UI directory
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the BMI result
interface BmiResult {
  bmi: string;
  category: string;
}

// Default export of the BmiCalculator function
export default function BmiCalculator() {
  // State hooks for managing height, weight, BMI result, and error message
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>("");

  // Handler for updating height state on input change
  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value);
  };

  // Handler for updating weight state on input change
  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };

  // Function to calculate the BMI and determine the category
  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError("Please enter both height and weight."); // Alert if either input is empty
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number."); // Alert if height is not positive
      return;
    }

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number."); // Alert if weight is not positive
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters); // Calculate the BMI value
    let category = "";

    if (bmiValue < 18.5) {
      category = "Underweight"; // Set category based on BMI value
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmiValue.toFixed(1), category }); // Set the BMI result state
    setError(""); // Clear any previous error message
  };

  // JSX return statement rendering the BMI calculator UI
  return (
    <div className=" text-indigo-900 flex flex-col items-center justify-center min-h-screen bg-indigo-100">
      {/* Center the BMI calculator card within the screen */}
      <Card className="w-full max-w-md mx-auto border-[6px] py-7 px-3 pb-2 border-indigo-900 border-double bg-gradient-to-tr from-orange-100 via-pink-100 to-sky-200">
        <CardHeader>
          {/* Header with title and description */}
          <CardTitle className="text-4xl font-bold text-indigo-950">BMI Calculator</CardTitle>
          <CardDescription  className="text-md font-semibold">
            Enter your height and weight to calculate your BMI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input for height */}
          <div className="grid gap-2">
            <Label htmlFor="height"  className="text-lg font-semibold">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={handleHeightChange}
               className="text-md bg-indigo-200 rounded font-semibold"
            />
          </div>
          {/* Input for weight */}
          <div className="grid gap-2">
            <Label htmlFor="weight"className="text-lg font-semibold">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={handleWeightChange}
              className="text-md bg-indigo-200 rounded font-semibold"
            />
          </div>
          {/* Button to calculate BMI */}
          <Button onClick={calculateBmi} className="text-md text-white bg-indigo-950  hover:bg-gray-600 rounded font-semibold">Calculate</Button>
          {/* Display error message if any */}
          {error && <div className="text-red-700 text-center">{error}</div>}
          {/* Display BMI result if available */}
          {result && (
            <div className="grid gap-2">
              <div className="text-center text-2xl font-bold">{result.bmi}</div>
              <div className="text-center text-muted-foreground">
                {result.category}
              </div>
            </div>
          )}
          {/* card footer with copy right */}
          
        </CardContent>
        <div className="text-center text-sm text-muted-foreground pt-8 pb-0">
            &copy; 2024 By Yusra Saleem . All rights reserved.
          </div>
      </Card>

    </div>
  );
}
