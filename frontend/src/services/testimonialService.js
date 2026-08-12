import api from "../api/api";

export const getTestimonials = async () => {
    const response = await api.get("/testimonials");
    return response.data;
};

export const createTestimonial = async (testimonial) => {
    const response = await api.post("/testimonials", testimonial);
    return response.data;
};
