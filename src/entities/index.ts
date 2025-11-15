/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType url */
  slug?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publishedDate?: Date | string;
  /** @wixFieldType image */
  featuredImage?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType text */
  metaDescription?: string;
}


/**
 * Collection ID: casestudies
 * Interface for CaseStudies
 */
export interface CaseStudies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  challenge?: string;
  /** @wixFieldType text */
  solution?: string;
  /** @wixFieldType text */
  outcome?: string;
  /** @wixFieldType image */
  projectImage?: string;
  /** @wixFieldType url */
  projectUrl?: string;
  /** @wixFieldType date */
  dateCompleted?: Date | string;
}


/**
 * Collection ID: formsubmissions
 * Interface for FormSubmissions
 */
export interface FormSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  formType?: string;
  /** @wixFieldType text */
  submitterName?: string;
  /** @wixFieldType text */
  submitterEmail?: string;
  /** @wixFieldType text */
  submitterPhone?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType text */
  interestedService?: string;
  /** @wixFieldType text */
  budget?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType text */
  projectTimeline?: string;
  /** @wixFieldType url */
  submissionPageUrl?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: jobopenings
 * Interface for JobOpenings
 */
export interface JobOpenings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  jobDescription?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  employmentType?: string;
  /** @wixFieldType date */
  applicationDeadline?: Date | string;
  /** @wixFieldType date */
  datePosted?: Date | string;
  /** @wixFieldType url */
  applicationLink?: string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType text */
  keyBenefits?: string;
  /** @wixFieldType text */
  seoSlug?: string;
  /** @wixFieldType text */
  callToActionText?: string;
}


/**
 * Collection ID: teammembers
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType url */
  linkedinProfile?: string;
  /** @wixFieldType text */
  specialization?: string;
}


/**
 * Collection ID: trustedbusinesses
 * Interface for TrustedBusinesses
 */
export interface TrustedBusinesses {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  brandName?: string;
  /** @wixFieldType image */
  brandLogo?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  businessDescription?: string;
}


/**
 * Collection ID: trustedbusinesses
 * Interface for TrustedBusinesses
 */
export interface TrustedBusinesses {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  brandName?: string;
  /** @wixFieldType image */
  brandLogo?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  businessDescription?: string;
}
