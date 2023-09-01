const driver = {
  A: {
    x: Math.random()*10,
    y: Math.random()*10,
  },
  B: {
    x: Math.random()*10,
    y: Math.random()*10,
  }
};

let ordersArray = []

for (let i = 0; i < 99; i++) {
  ordersArray.push({
    A: {
      x: Math.random()*10,
      y: Math.random()*10,
    },
    B: {
      x: Math.random()*10,
      y: Math.random()*10,
    }
  })
}

const startZoneCenter = {
  x: (driver.A.x + driver.B.x) / 4,
  y: (driver.A.y + driver.B.y) / 4
}

const driveLength = Math.sqrt((driver.A.x - driver.B.x) ** 2 + (driver.A.y - driver.B.y) ** 2)

const startZoneRad = driveLength/4
const endZoneRad = driveLength/2

let candidates = []

ordersArray.map((order) => {
  let startCheck = (order.A.x - startZoneCenter.x) ** 2 + (order.A.y - startZoneCenter.y) ** 2 <= startZoneRad ** 2
  let endCheck = (order.B.x - driver.B.x) ** 2 + (order.B.y - driver.B.y) ** 2 <= endZoneRad ** 2

  if(startCheck && endCheck) {
    candidates.push(order)
  }
})


console.log(candidates)