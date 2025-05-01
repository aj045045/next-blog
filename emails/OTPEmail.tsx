import { OTPEmailProps } from "@/interface/email";
import { OTPGeneratorUtil } from "@/lib/otp-generator";
import { Html, Head, Body, Tailwind, Text, Section, Img, Preview, Container, Heading, Hr } from "@react-email/components"


export default function OTPEmailComp(props: OTPEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Blog Email Verification</Preview>
            <Tailwind>
                <Body className="bg-neutral-200 py-5 select-none">
                    <Container className="items-center bg-white rounded-md flex text-center flex-col font-sans ">
                        <Section>
                            <Img alt="Logo image" src="https://avatars.githubusercontent.com/u/113114943?v=4" className="w-28 p-2 my-2 mx-auto" />
                        </Section>
                        <Section>
                            <Heading className="text-3xl">Verify your email</Heading>
                            <Text className="text-2xl" >Hi {props.emailId}</Text>
                        </Section>
                        <Section>
                            <Text>Hello {props.name}, Use this code below to {props.task} in blog subscription</Text>
                        </Section>
                        <Section className="px-5">
                            <Text className="bg-green-400 p-3 text-center text-4xl select-text">{props.code}</Text>
                            <Text>The code will expire in 5 minutes</Text>
                        </Section>
                        <Section>
                            <Text>This code will securely {props.task} using</Text>
                            <Text className="text-blue-500">{props.emailId}</Text>
                        </Section>
                        <Section>
                            <Hr />
                            <Text className="text-neutral-500">If you didn&apos;t request this email, there&apos;s nothing to worry about, you can safely ignore it.</Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}


OTPEmailComp.PreviewProps = {
    name: "Ansh Yadav",
    task: "Register",
    code: OTPGeneratorUtil(),
    emailId: "aj045045@gmail.com"
}