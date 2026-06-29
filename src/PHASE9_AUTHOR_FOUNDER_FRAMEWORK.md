# Phase 9: Author & Founder Framework Implementation Guide
**Status:** Implementation Complete (Awaiting Verification)  
**Date:** 2026-06-29

---

## 1. Overview

This document provides implementation details for the author and founder profile frameworks created in Phase 9. All frameworks are designed to work with verified data only—no fake information is included.

---

## 2. Founder Profile Framework

### 2.1 Component: FounderProfileTemplate

**Location:** `/src/components/ui/founder-profile-template.tsx`

**Purpose:** Display verified founder information with proper schema markup

**Features:**
- Founder name and title
- Professional biography
- Credentials and expertise areas
- Professional photo
- Social media links (LinkedIn, Twitter, etc.)
- Years of experience
- Person schema markup

**Usage:**
```tsx
import { FounderProfileTemplate } from '@/components/ui/founder-profile-template';

<FounderProfileTemplate
  founder={{
    name: "Founder Name",
    title: "Founder & CEO",
    bio: "Professional biography...",
    photo: "https://...",
    credentials: ["Certification 1", "Certification 2"],
    yearsOfExperience: 10,
    expertise: ["Digital Marketing", "Lead Generation"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/...",
      twitter: "https://twitter.com/..."
    }
  }}
/>
```

**Data Structure:**
```typescript
interface FounderProfile {
  name: string;
  title: string;
  bio: string;
  photo: string;
  credentials: string[];
  yearsOfExperience: number;
  expertise: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}
```

**Schema Output:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Founder Name",
  "jobTitle": "Founder & CEO",
  "description": "Professional biography...",
  "image": "https://...",
  "sameAs": ["https://linkedin.com/in/..."],
  "knowsAbout": ["Digital Marketing", "Lead Generation"]
}
```

### 2.2 Implementation Steps

**Step 1: Gather Verified Information**
- [ ] Founder name (verified)
- [ ] Professional title
- [ ] Professional biography (250-300 words)
- [ ] Professional photo (high quality, 400x400px minimum)
- [ ] Years of experience in industry
- [ ] Expertise areas (3-5 main areas)
- [ ] Verified credentials/certifications
- [ ] LinkedIn profile URL
- [ ] Other social media profiles (optional)

**Step 2: Create Founder Profile Page**
- Create new page: `/src/components/pages/FounderPage.tsx`
- Import FounderProfileTemplate
- Add to Router.tsx with route `/founder`

**Step 3: Add to About Page**
- Import FounderProfileTemplate
- Add founder section to About page
- Include link to full founder profile

**Step 4: Update Organization Schema**
- Add founder information to Organization schema
- Include Person schema for founder
- Verify schema in Google Search Console

**Step 5: Publish (After Verification)**
- Owner verifies all information
- Owner approves founder profile
- Deploy to production

### 2.3 Verification Checklist

Before publishing founder profile:
- [ ] Founder name is correct and verified
- [ ] Title is accurate and current
- [ ] Bio is written by founder or approved by founder
- [ ] Photo is professional and recent
- [ ] Credentials are verified and current
- [ ] Years of experience is accurate
- [ ] Expertise areas are current
- [ ] Social media links are verified
- [ ] Schema markup validates without errors
- [ ] All information is factually accurate

---

## 3. Author Bio Framework

### 3.1 Component: AuthorBioCard

**Location:** `/src/components/ui/author-bio-card.tsx`

**Purpose:** Display author information on blog posts and author profile pages

**Features:**
- Author name and photo
- Author role/title
- Author bio (short version)
- Expertise areas
- Credentials
- Social media links
- Link to full author profile
- Person schema markup

**Usage:**
```tsx
import { AuthorBioCard } from '@/components/ui/author-bio-card';

<AuthorBioCard
  author={{
    id: "author-id",
    name: "Author Name",
    role: "Digital Marketing Specialist",
    bio: "Short bio...",
    photo: "https://...",
    expertise: ["SEO", "Content Marketing"],
    credentials: ["Google Ads Certified"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/..."
    }
  }}
  showFullBio={false}
/>
```

**Data Structure:**
```typescript
interface AuthorProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  expertise: string[];
  credentials: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}
```

### 3.2 Integration with Blog Posts

**Current Implementation:**
- AuthorBioCard displayed at end of blog posts
- Author information pulled from TeamMembers CMS
- Shows author name, role, and bio

**Enhanced Implementation:**
1. Add author credentials to blog post display
2. Add "Reviewed By" information
3. Add author profile link
4. Add Person schema for author

**Required CMS Fields:**
- `authorId` - Reference to team member
- `authorCredentials` - Array of credentials
- `reviewedBy` - Name of reviewer
- `reviewDate` - Date of review

### 3.3 Author Profile Page

**Location:** `/src/components/pages/AuthorPage.tsx` (To be created)

**Route:** `/author/:id`

**Features:**
- Full author biography
- Author photo
- Expertise areas
- Credentials
- Articles written by author
- Social media links
- Contact information

**Implementation:**
```tsx
import { useParams } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<TeamMembers | null>(null);
  const [articles, setArticles] = useState<BlogPosts[]>([]);

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorData = await BaseCrudService.getById<TeamMembers>('teammembers', id!);
      setAuthor(authorData);

      // Fetch articles by this author
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      const authorArticles = items.filter(post => post.author === authorData?.fullName);
      setArticles(authorArticles);
    };

    fetchAuthor();
  }, [id]);

  // Render author profile and articles
}
```

**Add to Router.tsx:**
```tsx
{
  path: "author/:id",
  element: (
    <Suspense fallback={<PageFallback />}>
      <AuthorPage />
    </Suspense>
  ),
}
```

### 3.4 Schema Markup for Authors

**Article Schema with Author:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://www.lookalikesolutions.com/author/author-id"
  },
  "reviewer": {
    "@type": "Person",
    "name": "Reviewer Name"
  }
}
```

### 3.5 Implementation Steps

**Step 1: Update TeamMembers CMS**
- Add field: `authorCredentials` (array of strings)
- Add field: `yearsOfExperience` (number)
- Add field: `expertiseAreas` (array of strings)
- Populate for all team members

**Step 2: Update BlogPosts CMS**
- Add field: `authorCredentials` (text)
- Add field: `reviewedBy` (text)
- Add field: `reviewDate` (date)
- Populate for existing blog posts

**Step 3: Create AuthorBioCard Component**
- ✅ Already created
- Display author information
- Include Person schema

**Step 4: Integrate with Blog Posts**
- ✅ Already integrated
- Display at end of post
- Link to author profile

**Step 5: Create Author Profile Page**
- Create `/src/components/pages/AuthorPage.tsx`
- Display full author profile
- Show articles by author
- Add to Router.tsx

**Step 6: Publish (After Verification)**
- Owner verifies author credentials
- Owner approves author profiles
- Deploy to production

### 3.6 Verification Checklist

Before publishing author profiles:
- [ ] Author name is correct
- [ ] Author role is accurate and current
- [ ] Author bio is approved by author
- [ ] Author photo is professional and recent
- [ ] Credentials are verified and current
- [ ] Expertise areas are accurate
- [ ] Years of experience is correct
- [ ] Social media links are verified
- [ ] Schema markup validates
- [ ] Author profile page works correctly

---

## 4. Blog Post Author Attribution

### 4.1 Current Implementation

**BlogPostPage.tsx Updates:**
- Display author name and photo
- Show author role
- Link to author profile
- Include Person schema for author

**Example:**
```tsx
<div className="author-section">
  <Image src={author.profilePicture} alt={author.fullName} />
  <div>
    <h4>{author.fullName}</h4>
    <p>{author.role}</p>
    <Link to={`/author/${author._id}`}>View Profile</Link>
  </div>
</div>
```

### 4.2 Enhanced Implementation

**Add to Blog Post:**
1. Author credentials
2. Reviewed by information
3. Review date
4. Author expertise areas

**Example:**
```tsx
<div className="author-section">
  <Image src={author.profilePicture} alt={author.fullName} />
  <div>
    <h4>{author.fullName}</h4>
    <p>{author.role}</p>
    {author.credentials && <p>Credentials: {author.credentials.join(", ")}</p>}
    {reviewedBy && <p>Reviewed by: {reviewedBy}</p>}
    <Link to={`/author/${author._id}`}>View Profile</Link>
  </div>
</div>
```

### 4.3 Schema Implementation

**Article Schema with Author and Reviewer:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "image": "https://...",
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://www.lookalikesolutions.com/author/author-id",
    "image": "https://...",
    "jobTitle": "Digital Marketing Specialist"
  },
  "reviewer": {
    "@type": "Person",
    "name": "Reviewer Name"
  }
}
```

---

## 5. Team Member Expertise Framework

### 5.1 CMS Structure

**TeamMembers Collection Fields:**
```typescript
interface TeamMembers {
  _id: string;
  fullName: string;
  role: string;
  profilePicture: string;
  bio: string;
  linkedinProfile: string;
  specialization: string;
  // NEW FIELDS:
  yearsOfExperience?: number;
  expertise?: string[]; // Array of expertise areas
  credentials?: string[]; // Array of certifications
  authorBio?: string; // Longer bio for author pages
  isAuthor?: boolean; // Can write blog posts
}
```

### 5.2 Implementation

**Step 1: Add Fields to CMS**
- Add `yearsOfExperience` (number)
- Add `expertise` (array of strings)
- Add `credentials` (array of strings)
- Add `authorBio` (text)
- Add `isAuthor` (boolean)

**Step 2: Populate Data**
- Owner provides expertise areas for each team member
- Owner provides verified credentials
- Owner provides years of experience
- Owner provides author bio (if applicable)

**Step 3: Display on Team Page**
- Show expertise areas on team cards
- Show credentials on hover/expanded view
- Link to author profile for authors

**Step 4: Use in Blog Posts**
- Display author expertise
- Display author credentials
- Link to author profile

---

## 6. Editorial Review Process

### 6.1 Framework

**Purpose:** Establish editorial standards and oversight

**Process:**
1. Author writes blog post
2. Content is reviewed by designated reviewer
3. Reviewer approves or requests changes
4. Approved content is published
5. Reviewer information is displayed on post

### 6.2 CMS Implementation

**BlogPosts Collection Fields:**
```typescript
interface BlogPosts {
  // ... existing fields
  // NEW FIELDS:
  reviewedBy?: string; // Name of reviewer
  reviewDate?: Date; // Date of review
  reviewStatus?: 'pending' | 'approved' | 'rejected';
  authorCredentials?: string; // Author's credentials
}
```

### 6.3 Display on Blog Post

**Example:**
```tsx
<div className="editorial-info">
  <p>Written by: {post.author}</p>
  {post.authorCredentials && <p>Credentials: {post.authorCredentials}</p>}
  {post.reviewedBy && <p>Reviewed by: {post.reviewedBy}</p>}
  {post.reviewDate && <p>Review date: {format(post.reviewDate, 'MMM d, yyyy')}</p>}
</div>
```

### 6.4 Schema Implementation

**Article Schema with Reviewer:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "author": { "@type": "Person", "name": "Author Name" },
  "reviewer": { "@type": "Person", "name": "Reviewer Name" }
}
```

---

## 7. Trust Evidence Section

### 7.1 Component: TrustEvidenceSection

**Location:** `/src/components/ui/trust-evidence-section.tsx`

**Purpose:** Display verified trust elements (testimonials, certifications, awards)

**Features:**
- Display testimonials with client info
- Display certifications with verification
- Display awards with details
- Display media mentions with links
- Responsive grid layout
- Schema markup for each element

**Usage:**
```tsx
import { TrustEvidenceSection } from '@/components/ui/trust-evidence-section';

<TrustEvidenceSection
  testimonials={[
    {
      id: "1",
      clientName: "Client Name",
      clientCompany: "Company Name",
      clientRole: "CEO",
      testimonial: "Great work!",
      rating: 5
    }
  ]}
  certifications={[
    {
      id: "1",
      name: "Google Partner",
      issuer: "Google",
      date: "2024-01-15"
    }
  ]}
/>
```

### 7.2 Implementation

**Step 1: Create CMS Collections (Optional)**
- Create "Testimonials" collection
- Create "Certifications" collection
- Create "Awards" collection
- Create "MediaMentions" collection

**Step 2: Populate Data**
- Owner provides verified testimonials
- Owner provides verified certifications
- Owner provides verified awards
- Owner provides verified media mentions

**Step 3: Display on Site**
- Add TrustEvidenceSection to About page
- Add TrustEvidenceSection to Homepage
- Add TrustEvidenceSection to Services pages

**Step 4: Schema Markup**
- Add schema for each testimonial
- Add schema for each certification
- Add schema for each award

---

## 8. Certification & Awards Section

### 8.1 Component: CertificationAwardsSection

**Location:** `/src/components/ui/certification-awards-section.tsx`

**Purpose:** Display verified certifications and awards

**Features:**
- Display certification logos
- Display certification details
- Display award information
- Verification badges
- Expiry date tracking
- Schema markup

**Usage:**
```tsx
import { CertificationAwardsSection } from '@/components/ui/certification-awards-section';

<CertificationAwardsSection
  certifications={[
    {
      id: "1",
      name: "Google Partner",
      issuer: "Google",
      logo: "https://...",
      verificationUrl: "https://...",
      expiryDate: "2025-12-31"
    }
  ]}
  awards={[
    {
      id: "1",
      name: "Best Digital Marketing Agency",
      issuer: "Industry Awards",
      year: 2024
    }
  ]}
/>
```

### 8.2 Implementation

**Step 1: Gather Information**
- Owner provides certification names
- Owner provides certification numbers
- Owner provides issuer information
- Owner provides verification links
- Owner provides expiry dates

**Step 2: Create Component**
- ✅ Already created
- Display certifications with logos
- Display awards with details
- Include verification links

**Step 3: Add to Pages**
- Add to About page
- Add to Homepage (optional)
- Add to Services pages (optional)

**Step 4: Schema Markup**
- Add schema for each certification
- Add schema for each award

---

## 9. Media Mentions Section

### 9.1 Component: MediaMentionsSection

**Location:** `/src/components/ui/media-mentions-section.tsx`

**Purpose:** Display verified media coverage

**Features:**
- Display publication logos
- Display article titles
- Display publication dates
- Links to articles
- Publication credibility indicators
- Schema markup

**Usage:**
```tsx
import { MediaMentionsSection } from '@/components/ui/media-mentions-section';

<MediaMentionsSection
  mentions={[
    {
      id: "1",
      publicationName: "TechCrunch",
      articleTitle: "Look A Like Solutions Raises Series A",
      publicationLogo: "https://...",
      articleUrl: "https://...",
      publishDate: "2024-01-15"
    }
  ]}
/>
```

### 9.2 Implementation

**Step 1: Gather Information**
- Owner provides publication names
- Owner provides article titles
- Owner provides article URLs
- Owner provides publication dates
- Owner provides publication logos

**Step 2: Create Component**
- ✅ Already created
- Display media mentions
- Include links to articles
- Show publication credibility

**Step 3: Add to Pages**
- Add to About page
- Add to Homepage (optional)
- Add to Services pages (optional)

**Step 4: Schema Markup**
- Add schema for each mention

---

## 10. Implementation Checklist

### Phase 1: Framework Setup ✅
- [x] Create FounderProfileTemplate component
- [x] Create AuthorBioCard component
- [x] Create TrustEvidenceSection component
- [x] Create CertificationAwardsSection component
- [x] Create MediaMentionsSection component
- [x] Document all frameworks

### Phase 2: Integration (In Progress)
- [x] Integrate AuthorBioCard with blog posts
- [x] Add Person schema for team members
- [ ] Create AuthorPage component
- [ ] Add author profile routes
- [ ] Update CMS fields for author credentials

### Phase 3: Verification (Awaiting Owner)
- [ ] Owner provides founder information
- [ ] Owner provides author credentials
- [ ] Owner provides certifications
- [ ] Owner provides awards
- [ ] Owner provides media mentions
- [ ] Owner provides testimonials

### Phase 4: Publishing (After Verification)
- [ ] Publish founder profile
- [ ] Publish author profiles
- [ ] Publish certifications
- [ ] Publish awards
- [ ] Publish media mentions
- [ ] Publish testimonials

---

## 11. Safety & Compliance

### What We Created
- ✅ Frameworks for verified data only
- ✅ Clear "VERIFICATION REQUIRED" states
- ✅ Safe implementation patterns
- ✅ Proper schema markup
- ✅ Documentation of requirements

### What We Did NOT Create
- ❌ Fake founder profiles
- ❌ Fabricated credentials
- ❌ Invented awards
- ❌ Fake media mentions
- ❌ Unverified testimonials

### Publishing Safety
- All frameworks include verification requirements
- No unverified data displays on live site
- Owner must explicitly verify before publishing
- Clear documentation of what needs verification

---

## 12. Next Steps

1. **Owner Review**
   - Review this framework
   - Gather verified information
   - Prepare documentation

2. **Information Collection**
   - Founder information
   - Author credentials
   - Certifications
   - Awards
   - Media mentions
   - Testimonials

3. **Implementation**
   - Update CMS fields
   - Populate verified data
   - Create author profile pages
   - Add to site pages

4. **Publishing**
   - Verify all information
   - Test schema markup
   - Deploy to production
   - Monitor impact

---

**Framework Completed By:** EEAT Specialist  
**Date:** 2026-06-29  
**Status:** Ready for owner verification and implementation
