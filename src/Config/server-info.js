//----------* IMPORTS *----------//
import os from 'os'
import dotenv from 'dotenv'
dotenv.config()

//----------* CONFIG SERVER INFO *----------//
export default {
  os: process.env.os,
  arguments: process.argv.slice(2),
  node_version: process.versions.node,
  memory_usage: process.memoryUsage().rss,
  exec_path: process.execPath,
  process_id: process.pid,
  current_working_directory: process.cwd(),
  numOfCPUs: os.cpus().length,
}
