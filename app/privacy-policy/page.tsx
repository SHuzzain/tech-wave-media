import { Section, Container, Prose } from "@/components/craft";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Tech Wave Media collects, uses, and protects information when you visit our website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const email = siteConfig.contact_email;

  return (
    <Section>
      <Container>
        <Prose>
          <h1>Privacy Policy</h1>
          <h2>Data Protection and Privacy Notice</h2>
          <p>
            Tech Wave Media respects your privacy and is committed to providing
            a secure online experience. This notice explains how we collect,
            use, manage, and protect information when you access the Tech Wave
            Media website.
          </p>
          <p>
            By visiting or using our website, you agree to the information
            handling practices described in this notice.
          </p>
          <h2>Information We Receive From You</h2>
          <p>
            Tech Wave Media may collect personal details that you voluntarily
            provide while contacting us, subscribing to our communications, or
            using our website.
          </p>
          <p>The information collected may include:</p>
          <ul>
            <li>Your name</li>
            <li>Email address</li>
            <li>Residential or business address</li>
            <li>Telephone number</li>
            <li>Any other information you submit voluntarily</li>
          </ul>
          <p>
            Our website may also automatically collect certain technical details
            about your device and browsing activity, including:
          </p>
          <ul>
            <li>Internet Protocol address</li>
            <li>Browser type and version</li>
            <li>Device and operating system information</li>
            <li>Domain name</li>
            <li>Website access date and time</li>
            <li>Pages visited</li>
            <li>Referring website address</li>
          </ul>
          <p>
            We use this technical information to operate the website, maintain
            service quality, identify technical problems, understand visitor
            activity, and generate general website usage statistics.
          </p>
          <h2>How We Handle Your Information</h2>
          <p>
            Tech Wave Media may use the information it collects to operate the
            website and provide the content, features, or services you request.
          </p>
          <p>We may also use your information to:</p>
          <ul>
            <li>Respond to questions, comments, and enquiries</li>
            <li>Send important website or service related updates</li>
            <li>Inform you about relevant products, services, or opportunities</li>
            <li>Share updates from Tech Wave Media and its affiliates</li>
            <li>Invite you to participate in surveys</li>
            <li>Research opinions about existing or potential services</li>
            <li>Improve website content and visitor experience</li>
            <li>Understand which website pages and topics are most popular</li>
            <li>Display content or advertisements based on general visitor interests</li>
          </ul>
          <p>
            Tech Wave Media does not sell, rent, or lease its subscriber or
            visitor lists to third parties.
          </p>
          <p>
            We may occasionally contact you on behalf of an external business
            partner regarding an offer that could be relevant to you. In such
            cases, your personally identifiable information—including your name,
            email address, postal address, or telephone number—will not be
            provided to that partner without an appropriate reason or your
            permission.
          </p>
          <h2>Website Preferences and Cookie Technology</h2>
          <p>
            The Tech Wave Media website may use cookies to improve and
            personalise your browsing experience.
          </p>
          <p>
            A cookie is a small text file stored on your computer, smartphone,
            tablet, or another device by a website server. Cookies cannot
            independently run software or install viruses on your device.
          </p>
          <p>
            Each cookie is assigned to your browser and can normally be read
            only by the website domain that created it.
          </p>
          <p>Cookies may help our website:</p>
          <ul>
            <li>Recognise returning visitors</li>
            <li>Remember selected preferences</li>
            <li>Save information previously entered</li>
            <li>Improve website functionality</li>
            <li>Analyse how visitors interact with different pages</li>
            <li>Deliver more relevant content and advertising</li>
          </ul>
          <p>
            For example, when you customise a page or select certain website
            preferences, a cookie may allow Tech Wave Media to remember those
            choices during a future visit.
          </p>
          <p>
            Most web browsers accept cookies automatically. However, you can
            change your browser settings to reject, remove, or receive alerts
            about cookies.
          </p>
          <p>
            Please understand that disabling cookies may prevent certain
            interactive features or personalised parts of the website from
            operating correctly.
          </p>
          <h2>Advertising Cookies From External Providers</h2>
          <p>
            Third-party advertising providers may place or recognise cookies in
            your browser while displaying advertisements on Tech Wave Media.
          </p>
          <p>
            These cookies may help advertising providers measure campaign
            performance, control how frequently an advertisement appears, or
            provide advertisements based on general browsing interests.
          </p>
          <p>
            Third-party cookies are managed by their respective providers and
            are subject to those providers’ privacy policies.
          </p>
          <h2>Email Updates and Subscriber Choices</h2>
          <p>
            Visitors who subscribe to Tech Wave Media newsletters or promotional
            emails may receive content updates, announcements, and other
            relevant communications.
          </p>
          <p>
            You can stop receiving these messages at any time by selecting the
            unsubscribe or one-click opt-out link displayed at the bottom of
            each newsletter.
          </p>
          <p>
            After an unsubscribe request is processed, you may still receive
            essential administrative or service related communications where
            necessary.
          </p>
          <h2>Measures Used to Protect Your Data</h2>
          <p>
            Tech Wave Media takes reasonable measures to protect personal
            information against unauthorised access, alteration, use,
            disclosure, or loss.
          </p>
          <p>
            Information submitted through our website may be stored on secured
            servers in a controlled environment. Appropriate organisational and
            technical safeguards are used to restrict unauthorised access.
          </p>
          <p>
            When sensitive information, such as payment or credit card details,
            is transmitted to another website or payment service, encryption
            technologies such as Secure Sockets Layer may be used to protect the
            transmission.
          </p>
          <p>
            Although we make reasonable efforts to protect personal information,
            no online transmission or electronic storage method can be
            guaranteed to be completely secure.
          </p>
          <h2>Revisions to This Notice</h2>
          <p>
            Tech Wave Media may occasionally revise this privacy notice to
            reflect changes in its services, technology, legal responsibilities,
            or visitor feedback.
          </p>
          <p>
            Any revised version will be published on this page. We encourage
            visitors to review this notice periodically to remain informed about
            how Tech Wave Media collects and protects information.
          </p>
          <p>
            Continued use of the website after an updated notice is published
            indicates acceptance of the revised practices.
          </p>
          <h2>Privacy Questions and Enquiries</h2>
          <p>
            Tech Wave Media welcomes questions, comments, and feedback regarding
            this privacy notice.
          </p>
          <p>
            For additional information or clarification, please contact us at:{" "}
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </Prose>
      </Container>
    </Section>
  );
}
