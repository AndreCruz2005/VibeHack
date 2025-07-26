import axios from 'axios'
import * as cheerio from 'cheerio'

async function testEMecScraper() {
  console.log('🔍 Testando scraper do e-MEC...')
  
  try {
    // Teste básico de conexão com o e-MEC
    const response = await axios.get('https://emec.mec.gov.br', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    console.log('✅ Conexão com e-MEC estabelecida')
    console.log('📊 Status:', response.status)
    console.log('📄 Tamanho da resposta:', response.data.length, 'caracteres')

    // Teste de busca simples
    const searchResponse = await axios.get('https://emec.mec.gov.br/emec/consulta-avancada', {
      params: {
        'query': 'Universidade',
        'pagina': 1
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    const $ = cheerio.load(searchResponse.data)
    
    // Verificar se encontrou resultados
    const results = $('.resultado-busca .item, .instituicao-item, .search-result')
    console.log('🔍 Resultados encontrados:', results.length)

    if (results.length > 0) {
      console.log('✅ Scraper funcionando! Encontrou', results.length, 'instituições')
      
      // Mostrar algumas instituições encontradas
      results.slice(0, 3).each((index, element) => {
        const $item = $(element)
        const name = $item.find('.nome, .nome-instituicao, h3, h4').first().text().trim()
        const type = $item.find('.tipo, .tipo-instituicao, .category').first().text().trim()
        
        console.log(`📚 ${index + 1}. ${name} (${type})`)
      })
    } else {
      console.log('⚠️ Nenhum resultado encontrado. Verificando estrutura da página...')
      
      // Listar elementos encontrados para debug
      const allElements = $('*').map((i, el) => $(el).prop('tagName')).get()
      const uniqueElements = [...new Set(allElements)]
      console.log('🏗️ Elementos HTML encontrados:', uniqueElements.slice(0, 10))
    }

  } catch (error) {
    console.error('❌ Erro ao testar scraper:', error.message)
    
    if (error.response) {
      console.log('📊 Status do erro:', error.response.status)
      console.log('🔗 URL que falhou:', error.config.url)
    }
  }
}

// Executar teste
testEMecScraper() 