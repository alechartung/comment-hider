import * as core from '@actions/core'
import {Client} from './client'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('github_token')
    const commentText: string = core.getInput('comment_text')
    const reason: string = core.getInput('hide_reason')

    const cli = new Client(token)
    const ids = await cli.SelectComments(commentText)
    for (const id of ids) {
      await cli.HideComment(id, reason)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
