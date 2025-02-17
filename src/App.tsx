import React from "react"

import { shuffle } from "./util/shuffle"
import persons from "./assets/persons.json"

import {
  ThemeProvider,
  light,
  Searcher,
  Navbar as SNavbar,
} from "./components/super-components/core"
import { Icons } from "./components/super-components/core/Icons"
import { UsersGridContainer } from "./components/UsersGrid/index"
import { PaginationContextProvider } from "./context/PaginationContext"
import { useData } from "./hooks/useData"
import { DataProvider } from "./context/DataContext"
import { useTheme } from "./components/super-components/core/hooks/useTheme"
import { countriesWithNumOfDevsObj } from "./util/UsersDataCleanup"
import Banner from "./assets/banner/banner.png"
import "./styles/SearchBarMobileView.scss"

const countryNamesAndNumOfDevsArr = Object.entries(countriesWithNumOfDevsObj)

const people: any = persons

const AppWrapper = (props: any) => {
  const { children } = props
  const { data } = useData()
  return (
    <PaginationContextProvider dataSource={data}>
      <ThemeProvider theme={light}>{children}</ThemeProvider>;
    </PaginationContextProvider>
  )
}

function Appaaa() {
  const { filterData, data } = useData()
  const { theme } = useTheme()
  shuffle(people)

  return (
    <>
      <div
        style={{
          height: "100%",
          borderRadius: 0,
          overflowY: "auto",
          background: theme.palette.common.light,
        }}
      >
        <SNavbar>
          <h1 id="title" className="relative ma0 pa0 fl-l pointer">
            <span className="fw3">Job</span>
            <span className="fw7" style={{ color: theme.palette.primary.main }}>
              Board
            </span>
          </h1>
        </SNavbar>
        <div
          style={{
            width: "100%",
            padding: "2rem",
            position: "relative",
            backgroundImage: `url(${Banner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundColor: theme.palette.primary.light,
          }}
        >
          <div
            style={{
              padding: "1rem",
              margin: "0 auto",
              width: "50rem",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontFamily: `'Roboto', sans-serif`,
                margin: 0,
                fontSize: "3rem",
                color: theme.palette.common.light,
                fontWeight: "bold",
              }}
            >
              Do you need a software engineer?
            </h1>

            <h2 style={{ color: theme.palette.common.light }}>
              {" "}
              <span>
                <Icons.TeamIcon style={{ width: "1.5rem" }} /> {people.length}{" "}
                Users
              </span>{" "}
              &nbsp;&nbsp;&nbsp; <Icons.WorldIcon />{" "}
              {countryNamesAndNumOfDevsArr.length} Countries
            </h2>
          </div>
          <br />
          <br />
          <Searcher
            name="name"
            placeholder=" search by name, job, city, state or country..."
            style={{
              padding: "1rem",
              width: "50rem",
              position: "absolute",
              bottom: "-1rem",
              left: "50%",
              transform: "translate(-50%)",
            }}
            onChange={(e: any) => {
              console.log(e)
              filterData(e)
            }}
          />
        </div>
        <br />
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <p style={{ color: theme.palette.primary.main }}>
            {data.length} Users Found
          </p>
        </div>
        <div style={{ padding: "0 2rem 2rem 2rem" }}>
          <UsersGridContainer people={people} />
        </div>
      </div>
    </>
  )
}

const App = () => {
  return (
    <DataProvider dataSource={people}>
      <AppWrapper>
        <Appaaa />
      </AppWrapper>
    </DataProvider>
  )
}

export default App
