import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import MyLayout from '../components/MyLayout'

const TermsOfUse: NextPage = () => {
  const [website, setWebsite] = useState("")
  useEffect(() => {
    if (window) {
      setWebsite(window.location.origin)
    }
  }, [])
  return (
    <MyLayout>
      <div className="font-rale px-4 max-w-screen-md mx-auto pb-40">
        <h1 id="terms" className="mt-12 text-center uppercase text-3xl">Terms of Use</h1>
        <div className="w-56 mx-auto">
          <img src="/images/tou.png" alt="terms of use" className="mt-20 w-full object-cover" />
        </div>
        <p className="mt-10 leading-relaxed">
          The website you have entered ({website}, its sub-domains, affiliated websites and applications, any mobile versions) and any services or Content (as defined below) available therefrom (the “Site”) is a copyrighted work owned and operated by JC Lee IP, French auto-entrepreneur, with its principal office in France, Caen (“JC Lee,” “we” or “us”).
        </p>
        <h2 className="text-xl mt-6 font-semibold">LAST MODIFIED: September 29, 2021</h2>
        <p className="mt-2 leading-relaxed">
          BY ACCESSING OR USING THE SITE, YOU HEREBY AFFIRM THAT YOU HAVE THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THE FOLLOWING TERMS AND CONDITIONS (THE “TERMS”). THESE TERMS TOGETHER WITH THE PRIVACY POLICY (LOCATED HERE) CONSTITUTE A LEGAL AGREEMENT BETWEEN YOU AND JC LEE.
        </p>
        <p className="mt-2 leading-relaxed">
          IF YOU ARE UNDER 18 YEARS OLD, YOUR PARENT OR LEGAL GUARDIAN MUST READ, UNDERSTAND, AND AGREE TO THESE TERMS ON YOUR BEHALF PRIOR TO YOUR ACCESS TO AND USE OF THE SITE. IF YOU DO NOT AGREE TO THESE TERMS OR HAVE NOT OBTAINED YOUR PARENT OR LEGAL GUARDIAN’S CONSENT TO AGREE TO THESE TERMS, DO NOT ACCESS OR USE THE SITE. IN NO EVENT MAY YOU ACCESS OR USE THIS SITE IF YOU ARE UNDER THE AGE OF 13.
        </p>
        <p className="mt-2 leading-relaxed">
          YOUR ACCESS TO AND USE OF THE SITE CONSTITUTES ACCEPTANCE OF THESE TERMS.
        </p>
        <h2 className="text-xl mt-6 font-semibold">1. CHANGES TO THE SITE OR TERMS</h2>
        <p className="mt-2 leading-relaxed">
          JC Lee reserves the right, at any time, to modify, suspend, or discontinue the Site (in whole or in part) at its sole discretion with or without notice to you. You agree that JC Lee will not be liable to you or to any third party for any modification, suspension, or discontinuation of the Site or any part thereof.
        </p>
        <p className="mt-2 leading-relaxed">
          JC Lee further reserves the right, at any time, to revise these Terms or to impose new terms and conditions with respect to access to or use of the Site, the Content, or any other matter, in its sole discretion. Any modification to the Terms shall become effective when posted. ANY ACCESS TO OR USE OF THIS SITE OR ANY CONTENT BY YOU AFTER THE POSTING OF THE REVISED TERMS SHALL CONSTITUTE YOUR AGREEMENT TO SUCH REVISED TERMS. No modification to these Terms shall be valid or enforceable against JC Lee unless expressly agreed to by JC Lee in a writing signed by a duly authorized officer of JC Lee.
        </p>
        <h2 className="text-xl mt-6 font-semibold">2. TERM AND TERMINATION</h2>
        <p className="mt-2 leading-relaxed">
          These Terms will remain in full force and effect while you access and use the Site. JC Lee may terminate these Terms or discontinue operation of the Site without notice to you, at any time and for any reason, in our sole discretion, without liability, including but not limited to if you breach any of these Terms. In the event of termination of these Terms with respect to you, you will no longer be authorized to access or use the Site or any Content.
        </p>
        <p className="mt-2 leading-relaxed">
          In the event of a termination of these Terms or termination of your access to and use of the Site, Sections 3 through 14 of these Terms shall survive and continue in full force and effect. Further, all rights granted by you shall remain in full force and effect and JC Lee shall be permitted, but shall not have any obligation, to delete any of your personal data collected in the operation of the Site unless otherwise required by law.
        </p>
        <h2 className="text-xl mt-6 font-semibold">3. LICENSE</h2>
        <p className="mt-2 leading-relaxed">
          Subject to these Terms, JC Lee grants you a non-transferable, non-exclusive, revocable, limited license to use and access the Site solely for your own personal, non-commercial use. Unauthorized access to or use of the Site or the Content is a breach of these Terms and may be a violation of law.
        </p>
        <h2 className="text-xl mt-6 font-semibold">4. SITE CONTENT</h2>
        <p className="mt-2 leading-relaxed">
          Unless specifically permitted herein, no information, materials, files, videos, or other content (collectively “Content”) comprising, contained in or distributed through the Site may be reproduced in any form or used by you without the prior written consent of JC Lee. The Site and the Content found therein are the property of JC Lee, its licensees and/or licensors. The Site and the Content are protected by copyright laws and international treaty provisions. You acknowledge that JC Lee or its business partners, licensees or licensors (as applicable) own and shall retain the exclusive right, title and ownership in and to all copyrights, trade secrets, trademarks and other intellectual property and proprietary rights in the Site and all Content. You agree not to use any automated means, including, without limitation, agents, robots, scripts, or spiders, to access, monitor or copy any part of the Site or any of the Content. You agree not to copy, modify, rent, lease, loan, sell, assign, distribute, reverse engineer, disassemble, decompile, attempt to obtain the source code of, grant a security interest in, publicly perform, publicly display, transfer or exploit the Site, the Content, any technology or software relating thereto, or any portion of any of the foregoing. All copyright, trademark, or other proprietary notices on the Site or any Content must be retained and displayed at all times.
        </p>
        <h2 className="text-xl mt-6 font-semibold">5. DISCLAIMER OF WARRANTIES AND REPRESENTATIONS</h2>
        <p className="mt-2 leading-relaxed">
          THE SITE AND THE CONTENT CONTAINED IN AND DISSEMINATED FROM THE SITE ARE PROVIDED “AS IS,” “AS AVAILABLE,” AND WITHOUT WARRANTY OR REPRESENTATION OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, ACCURACY, AND FITNESS FOR A PARTICULAR PURPOSE (ALL OF SUCH IMPLIED WARRANTIES AND REPRESENTATIONS BEING HEREBY EXPRESSLY DISCLAIMED). YOU ASSUME THE ENTIRE RISK (i) AS TO YOUR ACCESS TO AND USE OF THE SITE, AND YOUR SELECTION AND USE OF ANY CONTENT OBTAINED THROUGH OR FROM THE SITE; AND (ii) THAT THE SITE AND/OR THE CONTENT WILL MEET YOUR REQUIREMENTS, BE ACCURATE OR RELIABLE, HAVE ANY LEVEL OF QUALITY OR MEET YOUR EXPECTATIONS. JC LEE MAKES NO WARRANTY OR REPRESENTATION THAT YOUR ACCESS TO AND USE OF THE SITE OR THE CONTENT WILL BE UNINTERRUPTED, VIRUS FREE, ERROR-FREE OR COMPLETELY SECURE. YOU ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM HARDWARE OR SOFTWARE, OR FOR ANY LOSS OF DATA OR OTHER DAMAGES, RELATING TO YOUR ACCESS TO AND USE OF THE SITE OR THE SITE OR CONTENT. NO ADVICE, INFORMATION OR CONTENT, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM, THROUGH OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF THE SITE OR THE CONTENT, WILL CREATE OR PROVIDE ANY WARRANTY OR REPRESENTATION ON THE PART OF JC LEE OR ANY OF THE JC LEE PARTIES (AS HEREINAFTER DEFINED).
        </p>
        <p className="mt-2 leading-relaxed">
          Please note that some jurisdictions may not allow the exclusion of implied warranties, so some of the above exclusions may not apply to you. In such jurisdictions, the liability of the JC Lee Parties shall be limited to the greatest extent permitted by applicable law.
        </p>
        <h2 className="text-xl mt-6 font-semibold">6. USER CONDUCT; PROHIBITED ACTIVITIES</h2>
        <p className="mt-2 leading-relaxed">
          You agree that you shall not post, publish, submit or otherwise disseminate through the Site any content or other information:
        </p>
        <ul className="mt-2 space-y-2 leading-relaxed">
          <li>- that is known by you to be false, inaccurate or misleading;</li>
          <li>- that violates, infringes or misappropriates any third party’s copyright, patent, trademark, trade secret, right of privacy, right of publicity or other intellectual property or proprietary right;</li>
          <li>- that violates any law, statute, regulation, rule or ordinance (including, but not limited to, those governing export control, consumer protection, unfair competition, anti-discrimination or false advertising)</li>
          <li>- that is, or may reasonably be considered to be, defamatory, libelous, hateful, profane, abusive, racially, religiously, or otherwise biased or offensive, unlawfully threatening or unlawfully harassing to any individual or entity, or otherwise contains foul language;</li>
          <li>- that contains any computer viruses, worms or other potentially damaging computer programs or files</li>
        </ul>
        <p className="mt-2 leading-relaxed">
          In addition to the foregoing, you agree not to:
        </p>
        <ul className="mt-2 space-y-2 leading-relaxed">
          <li>- Download or upload any content or material that you know or reasonably should know cannot be legally obtained in such manner;</li>
          <li>- Restrict or inhibit any other user from using and enjoying any area within the Site;</li>
          <li>- Collect or store personal information about other users of the Site, or submit personal data on the Site without their express permission and authority to do so;</li>
          <li>- Attempt to access or use the Site or the Content after your access or use has been terminated;</li>
          <li>- Affect the way the Site displays Content (including any pages contained therein) other than through adjustments to your browser or display settings to facilitate your personal viewing of the Site;</li>
          <li>- Use any automated means to access or use the Site or to collect any Content contained therein;</li>
          <li>- Modify or create variant versions of the JC Lee name, trademark, indicia or logos;</li>
          <li>- Interfere with or disrupt the Site or the infrastructure;</li>
          <li>- Forge headers or manipulate identifiers or other data in order to disguise the origin of any content transmitted through the Site or to manipulate your presence on the Site;</li>
          <li>- Take any action that imposes an unreasonably or disproportionately large load on the Site or its infrastructure;</li>
          <li>- Engage in any acts or omissions that could constitute a violation of applicable laws, statutes, regulations, rules or ordinances.</li>
        </ul>
        <p className="mt-2 leading-relaxed">
          You agree to notify us if you suspect any activity in violation of these Terms and cooperate with our investigation of such violation.
        </p>
        <h2 className="text-xl mt-6 font-semibold">7. THIRD-PARTY LINKS</h2>
        <p className="mt-2 leading-relaxed">
          The Site may contain links to third-party websites and services for third parties (collectively, “Third-Party Links”). Such Third-Party Links are not under the control of JC Lee, and JC Lee is not responsible for any Third-Party Links. JC Lee provides access to these Third-Party Links only as a convenience to you, and does not review, approve, monitor, endorse, warrant, or make any representations with respect to Third-Party Links. Your interaction with all Third-Party Links is at your own risk. When you click on any of the Third-Party Links, the applicable third party’s terms and policies apply, including the third party’s privacy and data gathering practices.
        </p>
        <h2 className="text-xl mt-6 font-semibold">8. COPYRIGHT AND TRADEMARK INFORMATION</h2>
        <p className="mt-2 leading-relaxed">
          © JC Lee IP, 2021. All rights reserved.
        </p>
        <p className="mt-2 leading-relaxed">
          Your use of any trademarks, service marks, branding, logos, and designs owned or licensed by JC Lee is prohibited without the prior written consent of JC Lee or the consent of the third party that owns the trademark.
        </p>
        <h2 className="text-xl mt-6 font-semibold">9. PRIVACY</h2>
        <p className="mt-2 leading-relaxed">
          Certain information collected from you or about you in the course of your access to or use of the Site is subject to our Privacy Policy (located HERE), which is incorporated into these Terms by reference and may be revised from time to time as provided therein. You acknowledge, agree and consent to the information collection, distribution and other terms, conditions and matters set forth in the Privacy Policy.
        </p>
        <h2 className="text-xl mt-6 font-semibold">10. GOVERNING LAW AND JURISDICTION</h2>
        <p className="mt-2 leading-relaxed">
          The Site is controlled and managed by JC Lee from its office in France and is targeted to France and the European Union. These Terms shall be governed by and construed in accordance with the laws of France and the European Union, without reference to its conflicts of laws principles. By accessing or using the Site, you submit to the non-exclusive jurisdiction of the courts of France and the European Union to resolve any dispute arising out of or in connection with these Terms, the Site or the Content, and waive any objections thereto including those of inconvenient forum or similar defenses.
        </p>
        <p className="mt-2 leading-relaxed">
          You must not access or use the Site or the Content in countries where it is restricted, prohibited or limited by local law, regulations, codes or customs. JC Lee makes no warranty or representation that the Site or the Content is appropriate or available for access or use in locations outside of France and the European Union.
        </p>
        <h2 className="text-xl mt-6 font-semibold">11. INDEMNIFICATION</h2>
        <p className="mt-2 leading-relaxed">
          You agree to defend, indemnify and hold harmless JC Lee, its affiliates, subsidiaries, licensees, vendors, partners, and each of their respective directors, officers, members, managers, employees, agents and representatives from and against any and all claims, actions, losses, damages, liabilities, judgments, settlements, costs and expenses (including, but not limited to, reasonable attorneys’ fees and court costs) arising out of or relating to (a) your breach of these Terms or any applicable laws or regulations, (b) your access to or use of the Site and/or the Content, (c) your violation, breach or misappropriation of a third party’s copyright, patent, trademark, trade secret, right of privacy, right of publicity, or other intellectual property, proprietary or other right, (d) your tortious acts including, without limitation, defamation, and/or (e) any claims you may raise against third parties relating to third party products or services. We reserve the right to assume, at our expense, the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of such claims. If we assume such defense, we will be responsible solely for our legal fees in connection with such defense and all other losses, damages, liabilities, judgments, settlements, costs and expenses shall be your sole responsibility.
        </p>
        <h2 className="text-xl mt-6 font-semibold">12. MISCELLANEOUS</h2>
        <p className="mt-2 leading-relaxed">
          These Terms constitute the entire agreement between you and us regarding the access to or use of the Site. Our failure to exercise or enforce any right or provision of these Terms shall not operate as a waiver of such right or provision. The section titles in these Terms are for convenience only and have no legal or contractual effect. If any provision of these Terms is, for any reason, held to be invalid or unenforceable, the other provisions of these Terms will be unimpaired and the invalid or unenforceable provision will be deemed modified so that it is valid and enforceable to the maximum extent permitted by law.
        </p>
        <p className="mt-2 leading-relaxed">
          If you have questions or comments, please contact us at: <a className="underline text-blue-700 font-open" href="mailto:dev.if.ljc@gmail.com">dev.if.ljc@gmail.com</a>.
        </p>
      </div>
    </MyLayout>
  )
}

export default TermsOfUse