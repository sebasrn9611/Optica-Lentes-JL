package com.opticalentesjl.backend.service;

import com.opticalentesjl.backend.entity.Testimonial;
import com.opticalentesjl.backend.repository.TestimonialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public TestimonialService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    public List<Testimonial> findAll() {
        return testimonialRepository.findAllByOrderByCreatedAtDesc();
    }

    public Testimonial save(Testimonial testimonial) {
        testimonial.setId(null);
        testimonial.setName(testimonial.getName().trim());
        testimonial.setComment(testimonial.getComment().trim());
        return testimonialRepository.save(testimonial);
    }
}
