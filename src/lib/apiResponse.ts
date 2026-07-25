export function okResponse(data: unknown, status = 200) {
  return Response.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 500) {
  return Response.json({ success: false, error: message }, { status });
}