import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert  // Given, When, Then
///PAV - PREPARAR, AGIR, VERIFICAR


/// Preparar: Acessar a pagina de consulta de pedidos
test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/') // Arrange
 
  //Checkpoint // este trecho faz parte do preparo, pois pode ser reaproveitado no futuro   
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()

  //Checkpoint
  // Action: Preencher o campo de busca com o numero do pedido
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  await page.getByTestId('search-order-id').fill('VLO-KQS9V3') // preenche o campo de busca com o numero do pedido // When
  await page.getByTestId('search-order-button').click()
   
  
  // Verificar: Verificar se o pedido foi encontrado
  await expect(page.getByTestId('order-result-id')).toBeVisible() // Then
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-KQS9V3') // Then
  await expect(page.getByTestId('order-result-status')).toBeVisible() // Then
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO') // Then


})