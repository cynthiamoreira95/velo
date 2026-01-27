import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert  // Given, When, Then ///PAV - PREPARAR, AGIR, VERIFICAR

/// Preparar: Acessar a pagina de consulta de pedidos
test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/') // Arrange //Checkpoint // este trecho faz parte do preparo, pois pode ser reaproveitado no futuro 
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  //Checkpoint
  // Action: Preencher o campo de busca com o numero do pedido

  
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-KQS9V3');
  //await page.getByLabel('Número do Pedido').fill('VLO-KQS9V3') // são formas diferentes de encontrar o elemento
  //await page.getByPlaceholder('Ex: VLO-ABC123').fill('VLO-KQS9V3') // são formas diferentes de encontrar o elemento. Ficou fixo o método da linha 17
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();
   
  
  // Verificar: Verificar se o pedido foi encontrado

 
  //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000}) // Then // adicionando timeout explicito de 10 segundos, para evitar o sleep
  await expect(page.getByText('VLO-KQS9V3')).toBeVisible({timeout: 10_000});
  await expect(page.getByTestId('order-result-VLO-KQS9V3')).toContainText('VLO-KQS9V3')
  //await expect(page.getByTestId('order-result-id')).toContainText('VLO-KQS9V3') // Then
  
  //await expect(page.getByTestId('order-result-status')).toBeVisible() // Then
  await expect(page.getByText('APROVADO')).toBeVisible();
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO') // Then
  await expect(page.getByTestId('order-result-VLO-KQS9V3')).toContainText('APROVADO');


})