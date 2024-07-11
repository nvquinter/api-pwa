import z from "zod";

const charactersSchema = z.object({
    name: z.string({
        required_error: "Field is required",
    })
    .min(1),
    species: z.string({
        required_error: "Field is required",
    })
    .min(1),
    gender: z.string({
        required_error: "Field is required",
    })
    .min(1),
    origin: z.string({
        required_error: "Field is required",
    })
    .min(1),
    
    // imagen: z.string(),

    status: z.string({
        required_error: "Field is required",
    })
    .min(1),
    
});

export function validateCharacters(object){
    return charactersSchema.safeParse(object);
}

// funcion para validar el metodo patch (validar de forma parcial)
export function validatePartial(object){
    return charactersSchema.partial().safeParse(object);
}

