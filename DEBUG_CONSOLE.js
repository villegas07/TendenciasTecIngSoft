// 🔍 SCRIPT DE DEBUG - Ejecutar en F12 Consola

console.log("=== DEBUG SISTEMA DE ROLES ===\n");

// 1. Verificar usuario actual
console.log("📍 USUARIO ACTUAL EN LOCALSTORAGE:");
const currentUser = JSON.parse(localStorage.getItem('micromarket_user') || 'null');
console.log(currentUser);
console.log("Propiedades:", Object.keys(currentUser || {}));
console.log("¿Tiene 'role'?", currentUser?.role ? "✅ SÍ" : "❌ NO");
console.log("Valor de role:", currentUser?.role);

// 2. Verificar todos los usuarios
console.log("\n📋 TODOS LOS USUARIOS EN LOCALSTORAGE:");
const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
console.log(allUsers);
allUsers.forEach((u, i) => {
  console.log(`  ${i+1}. ${u.name} (${u.email}) - role: "${u.role || 'SIN ROLE'}"`);
});

// 3. Verificar Header
console.log("\n🔍 VERIFICACIÓN DEL HEADER:");
const headerLink = document.querySelector('a[href="/catalog-management"]');
console.log("¿Existe link 'Gestión'?", headerLink ? "✅ SÍ" : "❌ NO");
if (headerLink) {
  console.log("Link visible?", headerLink.offsetParent !== null ? "✅ SÍ" : "❌ NO");
  console.log("Link texto:", headerLink.textContent);
}

// 4. Verificación final
console.log("\n✅ RESULTADO:");
if (currentUser?.role === 'vendedor') {
  console.log("✅ Usuario es VENDEDOR - Debería ver 'Gestión'");
  if (headerLink) {
    console.log("✅ Link está presente");
  } else {
    console.log("❌ ERROR: Link NO está presente (Bug)");
  }
} else if (currentUser?.role === 'comprador') {
  console.log("✅ Usuario es COMPRADOR - NO debería ver 'Gestión'");
  if (headerLink) {
    console.log("❌ ERROR: Link está presente (Bug)");
  } else {
    console.log("✅ Link está oculto correctamente");
  }
} else {
  console.log("❌ ERROR: Usuario no tiene role definido");
}
