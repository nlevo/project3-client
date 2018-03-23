export interface Property {
    name: string; 
    building: string,
    unit: string,
    bedrooms: Bedroom[];
    isActive: Boolean,
    address: {
        apartment_num: string,
        street: string,
        city: string,
        state: string,
        zip: string,
      },
    effective_date: Date,
    end_date: Date,
    floor_plan: Number,
    max_occupancy: Number,
    comments: string,
    special_instructions: Instruction[],
    tier: string,
    bathrooms: Number,
    owned_by: Owner[],
}

export interface Bedroom {
    bedroom_type: string;  
    bedsize1: string,
    bedsize2: string,
    bedsize3: string,
    bedsize4: string,
}

export interface Instruction {
    instruction: string;
}

export interface Bedsize {
    bedsize: string;
}

export interface Owner {
    owner_id: Object,
}