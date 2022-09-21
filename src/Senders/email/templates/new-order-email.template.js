//----------* IMPORTS *----------//
import dotenv from 'dotenv'

//----------* CONFIG *----------//
dotenv.config()

export const newOrderEmailTemplate = (order) => {
  let products = order.products
    .map((product) => {
      return `<li><b>${product.name}</b>: $${product.price}</li>`
    })
    .join(' ')

  const fullName = `${order.first_name} ${order.last_name}`
  const subject = `${fullName} realizó una compra  ✅`

  const mailOptions = {
    from: `${process.env.GMAIL_USER_ALIAS} <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: subject.toLocaleUpperCase(),
    html: `
			<h1 style="margin-bottom: 0px;">Detalles de la orden ${order.id}</h1>
			<hr>
			<p style="margin: 0px;"><img src="${order.image}" width="100px"/></p>
			<p style="margin: 0px;"><b>Nombre:</b> ${fullName}</p>
			<p style="margin: 0px;"><b>Correo:</b> ${order.email}</p>
			<p style="margin: 0px;"><b>Teléfono:</b> ${order.phone}</p>
			<p style="margin: 0px;"><b>Productos:</b></p>
			<ol>
				${products}
			</ol>
		`,
  }

  return mailOptions
}
