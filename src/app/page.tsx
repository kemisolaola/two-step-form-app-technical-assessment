"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/lib/form-schema";
import { ArrowLeft, ArrowRight } from "lucide-react";

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validate on every input change
    reValidateMode: "onChange", // Re-validate on change for dynamic updates
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      interest: "",
      terms: false,
      favorite: "",
    },
  });

  const { control, handleSubmit, watch } = form;
  const interest = watch("interest");

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    console.log("Form Submission:", data);
  };

  const handleNext = () => {
    form
      .trigger(["email", "firstName", "lastName", "interest"])
      .then((isValid) => {
        if (isValid) setStep(2);
      });
  };

  const getFavoriteOptions = (interest: string) => {
    switch (interest) {
      case "Cars":
        return [
          { value: "Convertible", label: "Convertible" },
          { value: "Sedan", label: "Sedan" },
          { value: "SUV", label: "SUV" },
          { value: "Other", label: "Other" },
        ];
      case "Music":
        return [
          { value: "Folk", label: "Folk" },
          { value: "Jazz", label: "Jazz" },
          { value: "Punk", label: "Punk" },
          { value: "Other", label: "Other" },
        ];
      case "Sport":
        return [
          { value: "Baseball", label: "Baseball" },
          { value: "Basketball", label: "Basketball" },
          { value: "Football", label: "Football" },
          { value: "Ice Hockey", label: "Ice Hockey" },
          { value: "Other", label: "Other" },
        ];
      default:
        return [];
    }
  };

  const getFavoriteLabel = (interest: string) => {
    switch (interest) {
      case "Cars":
        return "Favorite Car Type";
      case "Music":
        return "Favorite Music Genre";
      case "Sport":
        return "Favorite Sport";
      default:
        return "Favorite";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        We'll contact you here with relevant updates.
                      </p>
                      <FormControl>
                        <Input
                          placeholder="Please enter your email"
                          {...field}
                          className={
                            form.formState.errors.email ? "border-red-700" : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter your first name"
                          {...field}
                          className={
                            form.formState.errors.firstName
                              ? "border-red-700"
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter your last name"
                          {...field}
                          className={
                            form.formState.errors.lastName
                              ? "border-red-700"
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={
                              form.formState.errors.interest
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select an interest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Cars">Cars</SelectItem>
                          <SelectItem value="Music">Music</SelectItem>
                          <SelectItem value="Sport">Sport</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="rounded-full"
                  >
                    <span className="mr-1">Next</span>
                    <ArrowRight className=" h-4 w-4 " />
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <FormField
                  control={control}
                  name="favorite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getFavoriteLabel(interest)}</FormLabel>
                      <p className="text-sm text-muted-foreground mt-[2px]">
                        Choose what you'd like to get updates about.
                      </p>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={
                              form.formState.errors.favorite
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue
                              placeholder={`Select ${getFavoriteLabel(
                                interest
                              ).toLowerCase()}`}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getFavoriteOptions(interest).map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="terms"
                  render={({ field }) => (
                    <>
                      {" "}
                      <FormItem className="flex items-center space-x-2">
                        <FormControl className="mt-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={
                              form.formState.errors.terms
                                ? "border-red-500"
                                : ""
                            }
                          />
                        </FormControl>
                        <FormLabel>Accept Terms and Conditions</FormLabel>
                      </FormItem>
                      <FormMessage />
                    </>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                    variant="outline"
                    className="border border-primary text-primary rounded-full"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4 " />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`rounded-full px-6 ${
                      isSubmitting ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
