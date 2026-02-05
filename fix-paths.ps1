# PowerShell script to fix all paths in HTML files

$rootPath = "c:/Users/dimzh/Documents/SEO"

# Function to fix paths in a file
function Fix-Paths {
    param(
        [string]$filePath,
        [string]$depth  # "" for root, "../" for one level deep, "../../" for two levels deep
    )
    
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # Fix CSS path
    $content = $content -replace 'href="/css/styles\.css"', "href=`"${depth}css/styles.css`""
    
    # Fix JS paths
    $content = $content -replace 'src="/js/casinos-data\.js"', "src=`"${depth}js/casinos-data.js`""
    $content = $content -replace 'src="/js/showcase\.js"', "src=`"${depth}js/showcase.js`""
    $content = $content -replace 'src="/js/showcase-compact\.js"', "src=`"${depth}js/showcase-compact.js`""
    $content = $content -replace 'src="/js/faq\.js"', "src=`"${depth}js/faq.js`""
    $content = $content -replace 'src="/js/main\.js"', "src=`"${depth}js/main.js`""
    
    # Fix image paths
    $content = $content -replace 'src="/images/', "src=`"${depth}images/"
    
    # Fix navigation links for subdirectories
    if ($depth -ne "") {
        $content = $content -replace 'href="/"', 'href="../index.html"'
        $content = $content -replace 'href="/reviews/"', 'href="../reviews/index.html"'
        $content = $content -replace 'href="/about-us/"', 'href="../about-us/index.html"'
        $content = $content -replace 'href="/responsible-gambling/"', 'href="../responsible-gambling/index.html"'
        
        # For two levels deep (reviews subdirectories)
        if ($depth -eq "../../") {
            $content = $content -replace 'href="\.\./index\.html"', 'href="../../index.html"'
            $content = $content -replace 'href="\.\./reviews/index\.html"', 'href="../index.html"'
            $content = $content -replace 'href="\.\./about-us/index\.html"', 'href="../../about-us/index.html"'
            $content = $content -replace 'href="\.\./responsible-gambling/index\.html"', 'href="../../responsible-gambling/index.html"'
        }
    }
    
    # Save file
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Fixed: $filePath"
}

# Fix files in about-us/
Get-ChildItem "$rootPath/about-us" -Filter "*.html" | ForEach-Object {
    Fix-Paths -filePath $_.FullName -depth "../"
}

# Fix files in responsible-gambling/
Get-ChildItem "$rootPath/responsible-gambling" -Filter "*.html" | ForEach-Object {
    Fix-Paths -filePath $_.FullName -depth "../"
}

# Fix files in reviews/ (one level)
Get-ChildItem "$rootPath/reviews" -Filter "*.html" | ForEach-Object {
    Fix-Paths -filePath $_.FullName -depth "../"
}

# Fix files in reviews subdirectories (two levels deep)
Get-ChildItem "$rootPath/reviews" -Directory | ForEach-Object {
    $subdir = $_
    Get-ChildItem $subdir.FullName -Filter "*.html" | ForEach-Object {
        Fix-Paths -filePath $_.FullName -depth "../../"
    }
}

# Fix template.html
if (Test-Path "$rootPath/template.html") {
    Fix-Paths -filePath "$rootPath/template.html" -depth ""
}

Write-Host "`nAll paths fixed successfully!"
