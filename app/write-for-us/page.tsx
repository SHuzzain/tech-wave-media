import { Section, Container, Prose } from "@/components/craft";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write for Us",
  description:
    "Guest post guidelines for Tech Wave Media. Submit original articles on business, technology, lifestyle, health, and more.",
  alternates: { canonical: "/write-for-us" },
};

export default function WriteForUsPage() {
  const email = siteConfig.guest_post_email;

  return (
    <Section>
      <Container>
        <Prose>
          <h1>Write for Us</h1>
          <p>
            Are you passionate about writing on business, technology, lifestyle,
            health, travel, food, entertainment, or other interesting topics? If
            you have valuable knowledge, practical advice, or compelling stories
            to share, Tech Wave Media welcomes your contribution.
          </p>
          <p>
            We publish original, informative, and engaging articles that provide
            genuine value to our readers. Whether you are an experienced writer,
            an industry professional, or an enthusiastic blogger, we would be
            delighted to review your work.
          </p>
          <h2>Topics We Accept</h2>
          <p>We welcome guest articles related to:</p>
          <ul>
            <li>Business and entrepreneurship</li>
            <li>Technology and software</li>
            <li>Lifestyle and wellness</li>
            <li>Health and fitness</li>
            <li>Travel and tourism</li>
            <li>Food and recipes</li>
            <li>Home improvement</li>
            <li>Entertainment and current trends</li>
            <li>News and related topics</li>
          </ul>
          <p>
            We may also consider other relevant article ideas that match the
            interests of our audience.
          </p>
          <h2>Content Requirements</h2>
          <p>Please follow these requirements when preparing your guest article:</p>
          <ul>
            <li>
              <strong>Original Content:</strong> The article must be completely
              original and must not have been published elsewhere.
            </li>
            <li>
              <strong>Useful Information:</strong> Your content should include
              practical tips, expert advice, tutorials, case studies, or
              meaningful insights.
            </li>
            <li>
              <strong>Clear Structure:</strong> Organise the article using
              appropriate headings, subheadings, short paragraphs, and bullet
              points.
            </li>
            <li>
              <strong>Engaging Writing:</strong> Use clear, natural, and
              reader-friendly language.
            </li>
            <li>
              <strong>Relevant Topic:</strong> The subject must be suitable for
              Tech Wave Media and valuable to our readers.
            </li>
          </ul>
          <h2>Submission Guidelines</h2>
          <ol>
            <li>Submit your article in Microsoft Word or Google Docs format.</li>
            <li>Articles should contain approximately 800–1,500 words.</li>
            <li>Include a short author biography of around 50–100 words.</li>
            <li>
              You may add a link to your website or social media profile in the
              author bio.
            </li>
            <li>Use proper headings and subheadings to improve readability.</li>
            <li>
              Include relevant images when required and provide appropriate
              credits.
            </li>
            <li>Proofread your article carefully before submitting it.</li>
          </ol>
          <h2>How to Submit Your Guest Post</h2>
          <p>
            Send your completed article or topic proposal to{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
          <p>
            Use the following subject line:{" "}
            <strong>Guest Post Submission – [Your Topic]</strong>
          </p>
          <p>
            Replace “[Your Topic]” with the proposed title or subject of your
            article.
          </p>
          <h2>Why Contribute to Tech Wave Media?</h2>
          <p>Writing for Tech Wave Media allows you to:</p>
          <ul>
            <li>Reach a growing audience of interested readers.</li>
            <li>Demonstrate your knowledge and professional experience.</li>
            <li>Strengthen your authority within your industry.</li>
            <li>Introduce your ideas to a broader community.</li>
            <li>Build your online presence as a writer or subject-matter expert.</li>
          </ul>
          <p>
            Our editorial team carefully reviews every submission. We generally
            provide feedback, approval, or revision requests within 7–10
            business days.
          </p>
          <p>
            We look forward to receiving your ideas and collaborating with
            talented writers who can bring valuable content to the Tech Wave
            Media community.
          </p>
          <h2>About Tech Wave Media</h2>
          <p>{siteConfig.site_description}</p>
          <p>
            For guest-post enquiries, contact{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
        </Prose>
      </Container>
    </Section>
  );
}
