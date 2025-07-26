export interface Institution {
  id: string;
  name: string;
  description: string;
  monthlyFee: number;
  mecRating: number;
  studentRating: number;
  infrastructure: string[];
  location: {
    state: string;
    city: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  transportOptions: string[];
  courseTypes: string[];
  availableCourses: Course[];
  images: string[];
  website: string;
  phone: string;
  email: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  accreditation: {
    mec: boolean;
    validUntil: string;
  };
  facilities: Facility[];
  reviews: Review[];
  statistics: {
    totalStudents: number;
    graduationRate: number;
    employmentRate: number;
    averageSalary: number;
  };
}

export interface Course {
  id: string;
  name: string;
  type: 'Bacharelado' | 'Licenciatura' | 'Tecnólogo' | 'Pós-graduação';
  duration: number; // em semestres
  monthlyFee: number;
  shift: 'Matutino' | 'Vespertino' | 'Noturno' | 'Integral';
  mecRating: number;
  description: string;
}

export interface Facility {
  name: string;
  description: string;
  available: boolean;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  course?: string;
  helpful: number;
}

export interface FilterCriteria {
  searchTerm: string;
  budget: {
    min: number;
    max: number;
  };
  mecRating: number;
  studentRating: number;
  infrastructure: string[];
  location: {
    state: string;
    city: string;
  };
  transportOptions: string[];
  courseType: string;
} 