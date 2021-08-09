import {
  Attributes,
  BasicInfo,
  Header,
  Skills,
} from "components";
import Head from 'next/head'
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const IndexPage = () => {

  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("headTitle")}</title>
      </Head>
      <div>
        <Header />
        <BasicInfo/>
        <Attributes/>
        <Skills/>
      </div>
    </>
  )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default IndexPage;
