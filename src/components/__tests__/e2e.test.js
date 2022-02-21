// https://www.npmjs.com/package/puppeteer

import puppeteer from 'puppeteer'

describe('e2e user', () => {
  test('readyGo', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(global.devHost)

    let userCount = 1
    const addUserButton = await page.$('.add-user')
    await addUserButton.click()
    const newUserCount = await page.evaluate(() => {
      return document.querySelectorAll('.user').length
    })
    expect(newUserCount).toBe(userCount + 1)

    await page.goto(global.devHost + '/pure-react-project-with-webpack/coupon?a=1&b=2')
    const stateBContent = await page.evaluate(() => {
      return document.querySelector('.state-b').innerText
    })
    const changeStateButton = await page.$('.change-state')
    await changeStateButton.click()
    const newStateBContent = await page.evaluate(() => {
      return document.querySelector('.state-b').innerText
    })
    expect(+newStateBContent).toBe(+stateBContent + 1)
  })
})
