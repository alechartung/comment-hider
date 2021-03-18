import {Client} from '../src/client'
import listComment from './list_comment.json'
import * as path from 'path'
import nock from 'nock'

describe('Hide Comments', () => {
  beforeEach(() => {
    nock.cleanAll()
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'payload.json')
  })

  it('should only select the hide me comment', async () => {
    const client = new Client('secrets', 'owner', 'repo', 1)
    const github = nock('https://api.github.com')
      .get(`/repos/owner/repo/issues/1/comments?page=1`)
      .reply(200, listComment)

    const github2 = nock('https://api.github.com')
      .get(`/repos/owner/repo/issues/1/comments?page=2`)
      .reply(200, [])

    const response = await client.SelectComments('hide me')

    expect(response).toStrictEqual(['hide me'])
  })
})
