/**
 * 发送PV事件
 */
export function sendPV() {
  const aplus_queue = (window as any).aplus_queue
  if (!aplus_queue) {
    return
  }
  aplus_queue.push({
    action: 'aplus.sendPV',
    arguments: [
      { is_auto: false },
      {
        param1: 111,
        param2: '222'
      }
    ]
  })
}

/**
 * 事件映射
 */
const trackMapping = {
  // 进入融信服平台
  rxf_pc_0001: 'rxf_pc_0001',
  // 点击贷款
  rxf_pc_0002: 'rxf_pc_0002'
}

/**
 * 打点
 */
export function track(eventCode: keyof typeof trackMapping) {
  const aplus_queue = (window as any).aplus_queue
  if (!aplus_queue) {
    console.error('打点失败！')
    return
  }
  aplus_queue.push({
    action: 'aplus.record',
    arguments: [
      trackMapping[eventCode] || trackMapping.rxf_pc_0001,
      'CLK',
      {
        param1: 111,
        param2: '222'
      }
    ]
  })
}
