import React from "react";
import { FormControl, FormField, FormItem } from "../ui/form";
import DateInput, { DateInputType } from "./DateInput";
import SelectInput, { SelectInputType } from "./SelectInput";
import { Input, InputType } from "./Input";
import { cn } from "@/lib/utils";

type BaseField = {
  label?: string | React.ReactNode;
  name: string;
  labelClass?: string;
  fieldClass?: string;
  className?: string;
};

type SelectField = BaseField & {
  fieldType: "select";
  props: SelectInputType;
};

type InputField = BaseField & {
  fieldType: "input";
  props?: InputType;
};
type DateField = BaseField & {
  fieldType: "date";
  props?: DateInputType;
};

export type FieldItems = SelectField | InputField | DateField;

interface Props {
  form: any;
  loading?: boolean;
  fields: FieldItems[];
  labelClassName?: string;
  containerClassName?: string;
}

export default function FieldInput({ fields, form, loading }: Props) {
  return (
    <>
      {fields.map((fd) => (
        <FormField
          key={fd.name}
          control={form.control}
          name={fd.name}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <div className={cn(fd.fieldClass, "space-y-2")}>
                  {fd?.label && (
                    <label
                      className={cn(fd.labelClass, "text-sm")}
                      htmlFor={fd.name}
                    >
                      {fd?.label}
                    </label>
                  )}

                  {fd.fieldType === "date" && (
                    <DateInput
                      disabled={loading || fd?.props?.disabled}
                      error={error ? String(error.message) : ""}
                      {...fd.props}
                      {...field}
                    />
                  )}
                  {fd.fieldType === "select" && (
                    <SelectInput
                      disabled={loading || fd?.props?.disabled}
                      error={error ? String(error.message) : ""}
                      {...fd.props}
                      {...field}
                    />
                  )}
                  {fd.fieldType === "input" && (
                    <Input
                      disabled={loading || fd?.props?.disabled}
                      error={error ? String(error.message) : ""}
                      {...field}
                      {...fd.props}
                    />
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
